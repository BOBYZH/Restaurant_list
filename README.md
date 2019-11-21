# Restaurant List v3 (我的餐廳清單，第三版)

### ALPHA Camp 學期三作業
(打造餐廳清單 => 建立餐廳清單的 CRUD => 重構餐廳清單)

## 如何使用：
0. 至少先在電腦上裝好Node.js
1. 從本專案頁面將檔案下載，或複製(clone)到要操作的電腦上
2. 安裝mongoDB Community Edition[依作業系統版本對照說明操作](https://docs.mongodb.com/manual/administration/install-community/)
3. 使用終端機(terminal)，將目錄切換至專案資料夾(restaurant_list)
4. 使用npm安裝需要的套件：
```
npm i express express-handlebars mongoose method-override
```
5. 切換至"./models/seeds"，執行"node restaurantInfoSeeder.js"，建立資料庫與範例資料
6. 執行本專案：
```
npm run dev
```
7. 開啟預覽連結
- 若是在本機操作，於瀏覽器網址列輸入[http://localhost:3000](http://localhost:3000)；
- 若使用虛擬主機，則須配合主機服務設定另用網址

## 主要功能：
- 瀏覽現有資料中的餐廳清單(含名稱、類別、評分)
- 點擊個別餐廳列出詳細介紹(含地址、電話、簡介)
- 輸入餐廳關鍵字來搜尋(目前僅支援餐廳名稱片段)

### 版本更新：
#### 第二版
- 資料儲存方式由json改為mongoDB，支援完整的CRUD操作，可新增、顯示、更新、刪除餐廳資料
- 刪除資料前會出現提示，避免誤刪
- 微調UI(使用者介面)
#### 第三版
- 增加依名稱遞增/減、類別、位置排序的選單功能
- 路由依RESTful設計與功能分類，重構動作指令與檔案獨立，便於未來維護

