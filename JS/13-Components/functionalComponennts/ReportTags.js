import styles from '!style-loader!css-loader?modules&localIdentName=[hash:base64:5]!sass-loader!./ReportTags.scss'

export default {
  functional: true,
  render (h, context) {
    const goodTags = context.props.goodTags.map(tag => {
      return tag.desc && <li on-click={ context.props.click.bind(null, tag.id) } class={ styles.icxTag }>{ tag.desc }</li> || null
    })
    const badTags = context.props.badTags.map(tag => {
      return tag.desc && <li on-click={ context.props.click.bind(null, tag.id) } class={ styles.icxTag }>{ tag.desc }</li> || null
    })
    return (
      <div class={ styles.reportTags + ' ' + context.props.className }>
        <div class={ styles.tagsTitle }>
          <span class="iconfont icon-tag"></span>
          <span>{ context.props.tagsTitle }</span>
        </div>
        <div class={ styles.tagsContent }>
          <ul class={ styles.tagList + ' ' + styles.goodTags }>
            { goodTags }
          </ul>
          <ul class={ styles.tagList + ' ' + styles.badTags }>
            { badTags }
          </ul>
        </div>
      </div>
    )
  },
  props: {
    className: {
      type: String
    },
    tagsTitle: {
      type: String,
      default: '标签特质'
    },
    goodTags: {
      type: Array,
      default: () => []
    },
    badTags: {
      type: Array,
      default: () => []
    },
    click: {
      type: Function,
      default: () => {}
    }
  }
}
