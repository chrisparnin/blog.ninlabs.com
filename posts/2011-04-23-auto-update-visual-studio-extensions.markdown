---
comments: true
date: 2011-04-23
layout: post
slug: auto-update-visual-studio-extensions
title: Auto-update Visual Studio Extensions
wordpress_id: 220
tags:
- code
---

VSX extensions/packages published and installed through the visual studio gallery will automatically check for updates and allow you to install the newest versions.

If you're not deploying your extension through the gallery, or just want auto-update capability for yourself, you can mimic this process yourself using the [IVSExtensionManager](http://msdn.microsoft.com/en-us/library/microsoft.visualstudio.extensionmanager.ivsextensionmanager.aspx) interface.  But when I wanted implement this, _exactly_ how to do it was not documented anywhere.

The process is actually straight-forward:

**You'll need to reference:**

    Microsoft.VisualStudio.ExtensionManager.dll
    Microsoft.VisualStudio.OLE.Interop
    Microsoft.VisualStudio.Shell.Interop.8.0

Warning, the extension assembly isn't published in the .NET components, you'll have to manually browse to the GAC to reference it:
C:\Windows\Microsoft.NET\assembly\GAC_MSIL\Microsoft.VisualStudio.ExtensionManager\v4.0_10.0.0.0__b03f5f7f11d50a3a\Microsoft.VisualStudio.ExtensionManager.dll

    var manager = Package.GetGlobalService(typeof(SVsExtensionManager)) as IVsExtensionManager;

Using the manager, get a list of installed extensions

    var names = new string[] { "Ganji", "Ganji.History", "Ganji.Margin" };
    var myExtensions = manager.GetInstalledExtensions().Where(ext =>names.Contains(ext.Header.Name)).ToList();

Next, we want to be able to download and then install a new version of our extension.
This is the general logic.  The details follow.

    bool needsRestart = false;
    foreach (var extension in myExtensions)
    {
        var newVersion = FetchIfUpdated(extension, webRepository.Where(r => r.Name == extension.Header.Name).SingleOrDefault());
        if (newVersion != null)
        {
            Install(manager, extension, newVersion);
            needsRestart = true;
        }
    }
    // Client needs to restart
    return needsRestart;

You can check and fetch a new version with the [IVsExtensionRepository](http://msdn.microsoft.com/en-us/library/microsoft.visualstudio.extensionmanager.ivsextensionrepository.aspx) manager.

    private IInstallableExtension FetchIfUpdated( IInstalledExtension extension, RepositoryEntry entry)
    { 
        var version = extension.Header.Version;
        var repoManager = Package.GetGlobalService(typeof(SVsExtensionRepository)) as IVsExtensionRepository;
        try
        {
            var newestVersion = repoManager.Download(entry);
            if (newestVersion.Header.Version > extension.Header.Version)
            {
                return newestVersion;
            }
        }
        catch (Exception ex)
        {
            // may not have internet connection, etc...
            Console.WriteLine(ex.Message);
        }
        return null;
    }

But you have to define your own IRepositoryEntry, which will be used as a parameter in the Download call.

    class RepositoryEntry : IRepositoryEntry
    {
        public string Name { get; set; }
        public string DownloadUrl { get; set; }
        public string VsixReferences { get; set; }
    }

Finally, installing the extension involves disabling your old extension, uninstalling it, installing the new extension, then enabling it.  A restart will be required before it takes affect however.

    private RestartReason Install( IVsExtensionManager manager, IInstalledExtension currentExtention, IInstallableExtension updatedExtension)
    {
        // Uninstall old
        manager.Disable(currentExtention);
        manager.Uninstall(currentExtention);

        // Install newer version
        var restartReason = manager.Install(updatedExtension, false);

        // Check newly installed version and enable (which is not the case by default)
        var newlyInstalledVersion = manager.GetInstalledExtension(updatedExtension.Header.Identifier);
        if (newlyInstalledVersion != null)
        {
            manager.Enable(newlyInstalledVersion);

            Console.WriteLine(string.Format("Updated: from {0} to {1} at {2}",
               currentExtention.Header.Version,
               newlyInstalledVersion.Header.Version,
               newlyInstalledVersion.InstallPath));
        }
            
        return restartReason;
    }
