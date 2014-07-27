# Bluefoot Toothball

* Connect the battery pack to the board
* Plug in the bluetooth module
* Pair with the bluetooth module
* Alter your solution for the first problem to connect over bluetooth instead of USB

## Connecting the battery pack

The positive (+) and negative (-) pins are at the top of the board near the USB connector. Ensure you plug the red cable to the positive pin and the black cable to the negative pin.

## Plugging in the bluetooth module

Make sure you plug in the module the right way around. Make sure the VCC, GND, RXD and TXD pins plug into the correct sockets on the board (look underneath the board to check).

## Pairing with the bluetooth module

Turn bluetooth on and attempt to pair with the device. The pairing code is **1234**.

## Connecting to the device

To connect over bluetooth to your device you need to change the port passed to the footballbot constructor.

The name of your device will vary from computer to computer.  To find it, examine tty devices under `/dev`:

> cd /dev
> ls -l tty.*
> crw-rw-rw- ... tty.Bluetooth-Incoming-Port
> crw-rw-rw- ... tty.Bluetooth-Modem
> crw-rw-rw- ... tty.HC-06-DevB

In the example above, `tty.HC-06-DevB` is the Arduino's bluetooth card, so we would use `/dev/tty.HC-06-DevB` as the device name.

## Components

- Bluetooth module - http://www.dagurobot.com/goods.php?id=128
