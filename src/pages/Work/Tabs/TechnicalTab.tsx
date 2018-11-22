import * as React from 'react'

import { WorkById } from 'components/atoms/Work'
import { Configuration } from 'configuration'
import { Api } from 'helpers/PoetApi'

import './TechnicalTab.scss'

export class TechnicalTab extends WorkById {
  poetURL() {
    return Api.WorkById.url(this.props.workId)
  }

  renderElement(resource: Api.WorkById.Response, headers: Headers) {
    if (!resource) return <div className="technical-tab">Could not load technical information.</div>

    if (!resource.anchor)
      return (
        <div className="technical-tab">Technical information not available. This work may be pending confirmation.</div>
      )

    return (
      <div className="technical-tab">
        <table>
          <tbody>{Object.entries(resource.anchor).map(([key, value]) => this.renderEntry(key, value))}</tbody>
        </table>
      </div>
    )
  }

  private renderEntry = (key: string, value: string) => {
    const links: { readonly [key: string]: string } = {
      transactionId: process.env.BTC_TXN_ID || Configuration.btcTxnId,
      blockHash: Configuration.btcBlockHash,
      blockHeight: Configuration.btcBlockHeight,
      ipfsFileHash: Configuration.ipfsGateway,
      ipfsDirectoryHash: Configuration.ipfsGateway,
    }
    const link = links[key]
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>
          {link ? (
            <a href={link + value} target="_blank">
              {value}
            </a>
          ) : (
            value
          )}
        </td>
      </tr>
    )
  }
}
