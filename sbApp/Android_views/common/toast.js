//封装Toast
import Toast from 'react-native-root-toast';
   var toast = {
     toastShort:function (content) {
       if (toast !== undefined) {
         Toast.hide(toast);
       }
       toast = Toast.show(content.toString(), {
         duration: Toast.durations.SHORT,
         position: Toast.positions.CENTER,
         shadow: true,
         animation: true,
         hideOnPress: true,
         delay: 0
       });
     }
   };

module.exports = toast;
