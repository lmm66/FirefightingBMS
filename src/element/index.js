// 导入自己需要的组件
import { Alert,Row,Col,Card,Button,Input,Dialog,Form,FormItem,Table,TableColumn,Tag,Select,Option,Container,Aside,Header,Main,Menu,MenuItem,Submenu,MenuItemGroup,Dropdown,DropdownMenu,DropdownItem, DatePicker } from 'element-ui'
import Vue from 'vue'
import { 
    Notification,
} from 'element-ui'
Vue.prototype.$notify = Notification;
const element = {
  install: function (Vue) {
    Vue.use(Alert)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Card)
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Dialog)
    Vue.use(Dialog)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Tag)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Container)
    Vue.use(Aside)
    Vue.use(Header)
    Vue.use(Main)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(Submenu)
    Vue.use(MenuItemGroup)
    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(DatePicker)
  }
}
export default element
