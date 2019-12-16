import styles from '!style-loader!css-loader?modules&localIdentName=[hash:base64:5]!sass-loader!./TypeCard.scss'

export default {
  functional: true,
  render (h, context) {
    const cardContent = context.props.isOpen ? <div class={ styles.cardDesc } html={ context.props.desc }></div> : <img src={ context.props.img }/>
    return (
      <div class={ styles.cardTop + ' ' + context.props.className } style={ 'backgroundImage: ' + context.props.bgColor } on-click={ context.props.click }>
        <div class={ styles.cardTitle }>
          <div class={ styles.titleL }>{ context.props.name }</div>
          <div class={ styles.titleR }>
            <span>说明</span>
            <span class={ context.props.isOpen ? 'iconfont icon-info_press' : 'iconfont icon-info' } style={ 'margin-left: .05rem; fontSize: 0.32rem' }></span>
          </div>
        </div>
        { cardContent }
      </div>
    )
  },
  props: {
    className: {
      type: String
    },
    isOpen: {
      type: Boolean
    },
    bgColor: {
      type: String
    },
    name: {
      type: String
    },
    desc: {
      type: String
    },
    img: {
      type: String
    },
    click: {
      type: Function,
      default: () => {}
    }
  }
}
