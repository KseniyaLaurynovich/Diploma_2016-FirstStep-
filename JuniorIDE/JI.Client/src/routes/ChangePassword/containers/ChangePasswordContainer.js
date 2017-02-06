import { connect } from 'react-redux'
import { actions } from '../modules/changepassword'

import ChangePasswordView from '../components/ChangePasswordView'

const mapDispatchToProps = {
  submit                          : actions.changePassword,
  handleOldPasswordChange         : actions.onOldPasswordChange,
  handleNewPasswordChange         : actions.onNewPasswordChange,
  handleConfirmNewPasswordChange  : actions.onConfirmNewPasswordChange
}

const mapStateToProps = (state) => ({
  confirmNewPasswordError     : state.changepassword.confirmNewPasswordError,
  validationState             : state.changepassword.validationState,
  changePasswordError         : state.changepassword.changePasswordError,
  isLoading                   : state.changepassword.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordView)
