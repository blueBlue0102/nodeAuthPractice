# 簡單會員系統

使用 **Node.js** 做出會員系統  
可以註冊/登入/登出

前端頁面取自[這裡](https://codyhouse.co/gem/loginsignup-modal-window/)並經過個人修改後，以 **EJS** 進行渲染

會員資料儲存在 **PostgreSQL**  
會員密碼以 **bcrypt** 的方式雜湊後儲存

使用 cookie 來辨別 request 的身分  
cookie 的內容為 session ID，保存期限為一年  
session data 儲存在 **Redis**，登出後銷毀
