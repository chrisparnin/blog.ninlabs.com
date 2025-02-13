---
author: Chris Parnin
category: Code
draft: false
image:
  alt: 'LabJack U3-LV'
  src: 'https://blog.ninlabs.com/wp-content/uploads/2010/06/labjack-300x216.jpg'
publishDate: '2010-06-24'
snippet: ''
tags:
- emg
- labjack
- subvocal
- code
title: Recording EMG, Sending Event Pulses with LabJack
---

When recording EMG signals, you want to be able to segment and associate those signals with certain events, e.g., the presentation of a stimuli.  Because one of my goals is to recognize subvocalized words, it is even more important to get tight segmentation.

[](https://blog.ninlabs.com/wp-content/uploads/2010/06/subvocal.png)[![](https://blog.ninlabs.com/wp-content/uploads/2010/06/emg.png)](https://blog.ninlabs.com/wp-content/uploads/2010/06/emg.png)[](https://blog.ninlabs.com/wp-content/uploads/2010/06/labjack.jpg)

Here, we have an test audio signal (blue) and one channel of the corresponding EMG signal (biege).  I had to manually line this up, and have little confidence if it is correct.

[![](https://blog.ninlabs.com/wp-content/uploads/2010/06/subvocal.png)](http://blog.ninlabs.com/wp-content/uploads/2010/06/subvocal.png)

Luckily, one the EMG devices I'm using supports sending events into the EMG stream to leave "marks" in the signal.  Using a Labjack device, I can send a digital pulse to the EMG recording device.

[![](https://blog.ninlabs.com/wp-content/uploads/2010/06/labjack-300x216.jpg)](http://blog.ninlabs.com/wp-content/uploads/2010/06/labjack.jpg)

Now, I have another channel with event marks!

[![](https://blog.ninlabs.com/wp-content/uploads/2010/06/events.png)](http://blog.ninlabs.com/wp-content/uploads/2010/06/events.png)

C# Code for Labjack.

```c#
    static System.Timers.Timer Timer;
    internal static void SendSignal()
    {
       //Set digital output FIO4 to output-high.
       LJUD.AddRequest(Connection.ljhandle, LJUD.IO.PUT_DIGITAL_BIT, 4, 1, 0, 0);

       //Set digital output FIO5 to output-high.
       LJUD.AddRequest(Connection.ljhandle, LJUD.IO.PUT_DIGITAL_BIT, 5, 1, 0, 0);

       //Execute the requests.
       LJUD.GoOne(Connection.ljhandle);

       Timer = new System.Timers.Timer(20);
       Timer.Elapsed += delegate(object sender, System.Timers.ElapsedEventArgs e)
       {
          Timer.Enabled = false;
          Timer = null;

          LJUD.AddRequest(Connection.ljhandle, LJUD.IO.PUT_DIGITAL_BIT, 5, 0, 0, 0);
          LJUD.AddRequest(Connection.ljhandle, LJUD.IO.PUT_DIGITAL_BIT, 4, 0, 0, 0);

          LJUD.GoOne(Connection.ljhandle);

       };
       Timer.Start();
    }
```