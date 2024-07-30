# Durum Senaryoları


-----------------------------------------
| **Senaryo ID**     | U1 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Kullanıcı Girişi |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının sistemde kayıtlı olması |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı uygulamayı açar. <br/> **2.** Sistem, kullanıcıdan "e-posta" ve "şifre" bilgilerini girmesini ister. <br/> **3.** Kullanıcı gerekli bilgileri girer ve "Giriş Yap" butonuna tıklar. <br/> **4.** Sistem, giriş bilgilerini kontrol eder. <br/> **5.** Sistem kullanıcıyı "Giriş Yapılmış Durum" a geçirir ve ana sayfaya yönlendirir |
| **Genişlemeler**   ||
|| **2.a.** Girilen bilgiler gerekli kurallara uymuyorsa <br/> • Bilgiler kurallara uygun halde girilene kadar işlemlere devam edilemez <br/> **4.a.** Girilen bilgiler doğru değilse <br/> • Hatalı Bilgilerde yeniden girme şansı <br/> • Yeni üyelik oluşturma imkanı <br/> |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U2 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Kullanıcı Kayıt |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının sistemde kayıtlı olmaması |
| **Hedef Şartlar**  ||
|| • Kullanıcı sisteme kaydedilir |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı uygulamayı açar. <br/> **2.** Sistem, kullanıcıdan "ad", "soyad", "e-posta" ve "şifre" olmak üzere üyelik için gerekli bilgileri girmesini ister. <br/> **3.** Kullanıcı gerekli bilgileri girer ve "Kayıt Ol" butonuna tıklar. <br/> **4.** Sistem, girilen bilgilerini kontrol eder. <br/>  **5.**  Sistem kullanıcıyı kaydeder |
| **Genişlemeler**   ||
|| **2.a.** Girilen bilgiler gerekli kurallara uymuyorsa <br/> • Bilgiler kurallara uygun halde girilene kadar işlemlere devam edilemez <br/> **4.a.** Girilen bilgiler sistemde var olan bir kullanıcı ile eşleşiyorsa <br/> • Sistem bilgilerin yeniden girilmesini ister |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U3 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Kullanıcı Silme |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının sistemde kayıtlı olması |
| **Hedef Şartlar**  ||
|| • Kullanıcı sistemden silinir |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı uygulamayı açar. <br/> **2.** Hesap silme ekranına gider. <br/> **3.** Kullanıcı gerekli onaylamayı yapar. <br/> **4.** Sistem kullanıcının silme işlemini onayladığını kontrol eder <br/> **5.** Sistem kullanıcıyı siler |
| **Genişlemeler**   ||
|| **4.a.** Kullanıcın silme işlemini onaylamaması <br/> • Sistem uyarı verir. |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U4 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Kullanıcı Hesap Bilgilerini Düzenleme |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının giriş yapılmış durumda olması |
| **Hedef Şartlar**  ||
|| • Hesap bilgileri güncellenir |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı hesap ayarları bölümüne girer. <br/> **2.** Kullanıcı hesap bilgilerini düzenler. <br/> **3.** Kullanıcı kaydet butonuna tıklar. |
| **Genişlemeler**   ||
|| **4.a.** Kullanıcı silme işlemini onaylamazsa, sistem silme işlemini iptal eder. |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U5 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Liste Oluşturma |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının giriş yapılmış durumda olması |
| **Hedef Şartlar**  ||
|| • Yeni bir todo list oluşturulur |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı yeni liste ekle butonuna tıklar. <br/> **2.** Yeni liste için gerekli görevleri yazar. <br/> **3.** Oluştur butonuna tıklar. |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U6 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Liste Düzenleme |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının giriş yapılmış durumda olması |
| **Hedef Şartlar**  ||
|| • Var olan todo list güncellenir |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı düzenleme yapmak istediği todo list'i seçer <br/> **2.**  Kullanıcı değişiklikleri yapar ve kaydeder |

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U7 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Liste Silme |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının giriş yapılmış durumda olması |
| **Hedef Şartlar**  ||
|| • Var olan todo list silinir |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı silmek istediği todo list'i seçer ve sil butonuna tıklar <br/> **2.**  Sistem kullanıcının silme işlemini onayladığını kontrol eder <br/> **3.** Sistem todo list'i siler | 

-----------------------------------------

<br/><br/><br/>

-----------------------------------------
| **Senaryo ID**     | U8 |
|-------------|---------------------------------------------------------------------------------------------------------------|
| **Senaryo**     | Liste Arama |
| **Aktör**    | Kullanıcı |
| **Önkoşullar**  | Kullanıcının giriş yapılmış durumda olması |
| **Hedef Şartlar**  ||
|| • Var olan todo listler arasında arama yapılır |
| **Ana Başarısı Senaryosu**   ||
|| **1.** Kullanıcı bulamk istediği todo list'in adını arama kısmına girer <br/> **2.**  Sistem kullanıcının bulmak istediği todo list'i arar ve gösterir | 

-----------------------------------------

<br/>
<br/>
<br/>

[README'ye dön](../README.md) 
