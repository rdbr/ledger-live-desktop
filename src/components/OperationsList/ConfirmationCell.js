// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'

import type { TokenAccount, Account, Operation } from '@ledgerhq/live-common/lib/types'

import type { T, CurrencySettings } from 'types/common'

import { currencySettingsForAccountSelector, marketIndicatorSelector } from 'reducers/settings'
import { getMarketColor } from 'styles/helpers'

import Box from 'components/base/Box'

import ConfirmationCheck from './ConfirmationCheck'

const mapStateToProps = createStructuredSelector({
  currencySettings: currencySettingsForAccountSelector,
  marketIndicator: marketIndicatorSelector,
})

const Cell = styled(Box).attrs({
  px: 4,
  horizontal: true,
  alignItems: 'center',
})`
  width: 44px;
`

type Props = {
  account: Account | TokenAccount,
  parentAccount?: Account,
  currencySettings: CurrencySettings,
  marketIndicator: string,
  t: T,
  operation: Operation,
}

class ConfirmationCell extends PureComponent<Props> {
  render() {
    const { account, parentAccount, currencySettings, t, operation, marketIndicator } = this.props

    const mainAccount = account.type === 'Account' ? account : parentAccount
    if (!mainAccount) return null // this should never happen

    const isNegative = operation.type === 'OUT'

    const isConfirmed =
      (operation.blockHeight ? mainAccount.blockHeight - operation.blockHeight : 0) >
      currencySettings.confirmationsNb

    const marketColor = getMarketColor({
      marketIndicator,
      isNegative,
    })

    return (
      <Cell align="center" justify="flex-start">
        <ConfirmationCheck
          type={operation.type}
          isConfirmed={isConfirmed}
          marketColor={marketColor}
          hasFailed={operation.hasFailed}
          t={t}
        />
      </Cell>
    )
  }
}

export default connect(mapStateToProps)(ConfirmationCell)
