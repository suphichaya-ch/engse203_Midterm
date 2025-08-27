### 1. การจัดการ View
ใช้ฟังก์ชัน `showView(viewName)` เพื่อซ่อนทุกหน้าจอแล้วแสดงเฉพาะหน้าที่ต้องการ เช่น:
```javascript
function showView(viewName) {
  const views = ['searchResults', 'detailsPage', 'favoritesPage'];
  views.forEach(v => document.getElementById(v).style.display = 'none');
  document.getElementById(viewName).style.display = 'block';
}
2. การจัดการ Event

ใช้ event.target เพื่อตรวจสอบว่าผู้ใช้คลิกที่:

ปุ่ม Favorite (class="favorite-btn") → เรียกฟังก์ชันจัดการรายการโปรด

การ์ดเครื่องดื่ม (class="drink-card") → เรียกฟังก์ชันแสดงรายละเอียด

3. การใช้ LocalStorage

LocalStorage เก็บข้อมูลเป็น string เท่านั้น จึงต้องใช้ JSON.stringify() แปลง object/array เป็น string ก่อนเก็บ และใช้ JSON.parse() แปลงกลับเป็น object/array เมื่ออ่าน

Part 2: React Analysis
1. การสื่อสารระหว่าง Component (Props)

Component ลูกส่งข้อมูลกลับ Component แม่โดยใช้ props เช่นส่งฟังก์ชัน onSearch จากแม่ไปให้ลูก แล้วลูกเรียก props.onSearch(value)

2. การจัดการ State ข้าม Components (Custom Hooks)

Custom Hook useFavorites จะเก็บ state รายการโปรดกลางไว้ ทำให้หลาย component สามารถอ่านและ update state พร้อมกันได้

3. การจัดการ Routing และ State

URL Parameters: เหมาะกับข้อมูลสำคัญที่ต้องเข้าถึงได้จาก URL เช่น /drink/123

State ใน <Link>: เหมาะกับส่งข้อมูลชั่วคราว เช่น object ขนาดใหญ่จากหน้าค้นหาไปหน้ารายละเอียด โดยไม่ต้องปรากฏใน URL