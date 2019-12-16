/**
 * Created by Berger on 2017/9/15.
 */
import styles from '!style-loader!css-loader?modules&localIdentName=[hash:base64:5]!sass-loader!./FoodItem.scss'

export default {
  functional: true,
  render (h, context) {
    return (
      <div class={ styles.foodItem }>
        <span class={ styles.foodIcon + ' ' + styles[context.props.food.id] }></span>
        <span class={ styles.foodName }>{ context.props.food.name }</span>
      </div>
    )
  },
  props: {
    food: {
      type: Object
    }
  }
}
