// @flow
import type { Command } from 'helpers/ipc'

import getAddress from 'commands/getAddress'
import signTransaction from 'commands/signTransaction'
import getDeviceInfo from 'commands/getDeviceInfo'
import getFirmwareInfo from 'commands/getFirmwareInfo'
import getIsGenuine from 'commands/getIsGenuine'
import getLatestFirmwareForDevice from 'commands/getLatestFirmwareForDevice'
import installApp from 'commands/installApp'
import listenDevices from 'commands/listenDevices'

export const commands: Array<Command<any, any>> = [
  getAddress,
  signTransaction,
  getDeviceInfo,
  getFirmwareInfo,
  getIsGenuine,
  getLatestFirmwareForDevice,
  installApp,
  listenDevices,
]
