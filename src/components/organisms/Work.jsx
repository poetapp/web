import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

import { DefaultAvatar, IPFS, Bitcoin, Quill } from 'Images'

import classNames from './Work.scss'

const Issuer = ({ issuer, avatarUrl, name }) => (
  <section className={classNames.issuer}>
    <h1>Claim Made By:</h1>
    <Link to={`/issuers/${issuer}`}>
      <img src={DefaultAvatar} />
      <span>{name}</span>
    </Link>
  </section>
)

const Overview = ({ name, author, datePublished, tags }) => (
  <section className={classNames.overview}>
    <h1>{name}</h1>
    <ul>
      <li>Author: {author}</li>
      <li>Date Published: {datePublished}</li>
      <li>Tags: {tags}</li>
    </ul>
  </section>
)

const Links = ({ ipfsLink, bitcoinLink }) => (
  <section className={classNames.links}>
    <a href={ipfsLink} target="_blank">
      <img src={IPFS} />View on IPFS</a>
    <a href={bitcoinLink} target="_blank">
      <img src={Bitcoin} />View on BTC
    </a>
  </section>
)

const Content = ({ content }) => (
  <section className={classNames.content}>
    <h1>Content</h1>
    <main>{content}</main>
  </section>
)

const AuthenticationBadgePreview = ({ date }) => (
  <section className={''}>
    <h1>Authentication Badge Preview</h1>
    <p>Embed this iframe to your site so readers can easily verify your timestamp.</p>
    <Badge date={date}/>
    <BadgeUrl />
  </section>
)

const Badge = ({ date }) => (
  <section className={classNames.badge}>
    <img src={Quill}/>
    <h1>Licensed via Po.et</h1>
    <span>{date}</span>
  </section>
)

const BadgeUrl = () => (
  <section className={classNames.badgeUrl}>
    <span>
      {
        '<iframe src="">' +
        '<div class="poet-badge" style="script/poetBadge.css" >' +
        '<img src="embed" />' +
        '</div>' +
        '</iframe>'
      }
    </span>
    <button>Copy URL</button>
  </section>
)

const bitcoinLink = tx => `https://blockchain.info/tx/${tx}`
const ipfsLink = ipfsHash => `https://ipfs.poetnetwork.net/ipfs/${ipfsHash}`

const formattedDate = date => moment(date).format('MMMM Do, YYYY')
const formattedDate2 = date => moment(date).format('MM-DD-YY [at] h:mm:ss a')

export const Work = ({ work, content }) => (
  <section className={classNames.work}>
    <header>
      <Overview
        name={work?.claim.name}
        author={work?.claim.author}
        datePublished={work?.claim.datePublished && formattedDate(work.claim.datePublished)}
        tags={work?.claim.tags}
      />
      <Issuer issuer={work?.issuer} avatarUrl={DefaultAvatar} name={work?.claim.author} />
      <Links
        bitcoinLink={bitcoinLink(work?.anchor?.transactionId)}
        ipfsLink={ipfsLink(work?.anchor?.ipfsDirectoryHash)}
      />
    </header>
    <main>
      <Content content={content}/>
      <AuthenticationBadgePreview date={formattedDate2(new Date())}/>
    </main>
  </section>
)