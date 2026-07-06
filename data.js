// data.js — barcha darajalar, darslar va savollar
// Savol: {s: savol, v: [4 variant], t: to'g'ri javob indeksi (0 dan), i: izoh}
// Yangi dars qo'shish: kerakli darajaning "darslar" ro'yxatiga yangi obyekt qo'shing.
const PASS = 70; // darsdan o'tish chegarasi (%)
const LEVELS = ["A1", "A2", "B1", "B2"];

const DATA = {
  A1: {
    nom: "A1 — Boshlang'ich",
    tavsif: "Salomlashish, oila, raqamlar, kundalik so'zlar",
    darslar: [
      { nom: "👋 Salomlashish", savollar: [
        { s: "«Привет» nimani bildiradi?", v: ["Xayr", "Salom", "Rahmat", "Iltimos"], t: 1, i: "Привет — do'stona salom. Rasmiysi: Здравствуйте." },
        { s: "«Доброе утро» nimani bildiradi?", v: ["Xayrli tun", "Xayrli kech", "Xayrli tong", "Xayrli kun"], t: 2, i: "Утро — tong. Kechqurun: Добрый вечер." },
        { s: "«Пока» qachon aytiladi?", v: ["Uchrashganda", "Xayrlashganda", "Ovqatdan oldin", "Uxlashdan oldin"], t: 1, i: "Пока — do'stona xayrlashuv. Rasmiysi: До свидания." },
        { s: "«Спасибо» nimani bildiradi?", v: ["Iltimos", "Kechirasiz", "Rahmat", "Marhamat"], t: 2, i: "Спасибо — rahmat. Javobi: Пожалуйста." },
        { s: "«Извините» nimani bildiradi?", v: ["Kechirasiz", "Rahmat", "Salom", "Mayli"], t: 0, i: "Извините — kechirasiz. Murojaat qilishda ham ishlatiladi." },
      ]},
      { nom: "🤝 Tanishish", savollar: [
        { s: "«Как тебя зовут?» nimani bildiradi?", v: ["Qayerdansan?", "Isming nima?", "Necha yoshdasan?", "Qalaysan?"], t: 1, i: "Звать — chaqirmoq. Javob: Меня зовут..." },
        { s: "«Меня зовут Азиз» qanday tarjima qilinadi?", v: ["Men Azizni chaqiryapman", "Mening ismim Aziz", "Aziz keldi", "Men Azizman edim"], t: 1, i: "So'zma-so'z: «meni Aziz deb chaqirishadi»." },
        { s: "«Очень приятно» qachon aytiladi?", v: ["Xayrlashganda", "Tanishganda", "Ovqatdan keyin", "Uxlashdan oldin"], t: 1, i: "Tanishgandan keyin: «tanishganimdan xursandman»." },
        { s: "«Откуда ты?» nimani bildiradi?", v: ["Qayoqqa ketyapsan?", "Qayerdansan?", "Kim bilan?", "Qachon kelding?"], t: 1, i: "Откуда — qayerdan. Javob: Я из Узбекистана." },
        { s: "«Мне двадцать лет» nimani bildiradi?", v: ["Soat yigirma", "Men 20 yoshdaman", "20 ta kitobim bor", "20-yanvar"], t: 1, i: "Yosh дательный kelishigida aytiladi: Мне ... лет." },
      ]},
      { nom: "👨‍👩‍👧 Oila", savollar: [
        { s: "«Мама» nimani bildiradi?", v: ["Opa", "Ona", "Xola", "Buvi"], t: 1, i: "Мама — ona. Rasmiysi: мать." },
        { s: "«Брат» nimani bildiradi?", v: ["Do'st", "Aka yoki uka", "Ota", "Qo'shni"], t: 1, i: "Брат — aka ham, uka ham. Katta: старший брат." },
        { s: "«Семья» nimani bildiradi?", v: ["Oila", "Do'stlar", "Yetti", "Urug'"], t: 0, i: "Семья — oila. Talaffuzi: «sim'ya»." },
        { s: "«Дочь» nimani bildiradi?", v: ["O'g'il", "Qiz (farzand)", "Nabira", "Singil"], t: 1, i: "Дочь — qiz farzand. O'g'il: сын." },
        { s: "«Дедушка» nimani bildiradi?", v: ["Amaki", "Buva", "Ota", "Tog'a"], t: 1, i: "Дедушка — buva. Buvi: бабушка." },
      ]},
      { nom: "🔢 Raqamlar", savollar: [
        { s: "«Три» qaysi raqam?", v: ["2", "3", "4", "5"], t: 1, i: "Один, два, три — 1, 2, 3." },
        { s: "«Семь» qaysi raqam?", v: ["6", "8", "7", "9"], t: 2, i: "Семь — 7. Семья bilan adashtirmang!" },
        { s: "«Десять» qaysi raqam?", v: ["12", "10", "100", "20"], t: 1, i: "Десять — 10. 100 esa: сто." },
        { s: "«Сколько?» nimani bildiradi?", v: ["Qachon?", "Qancha?", "Qayerda?", "Kim?"], t: 1, i: "Сколько стоит? — qancha turadi?" },
        { s: "«Пять» qaysi raqam?", v: ["5", "15", "50", "4"], t: 0, i: "Пять — 5. 15: пятнадцать, 50: пятьдесят." },
      ]},
      { nom: "🏠 Uy va narsalar", savollar: [
        { s: "«Дом» nimani bildiradi?", v: ["Xona", "Uy", "Eshik", "Shahar"], t: 1, i: "Дом — uy. Я дома — men uydaman." },
        { s: "«Стол» nimani bildiradi?", v: ["Stul", "Stol", "Shkaf", "Divan"], t: 1, i: "Стол — stol. Stul esa: стул." },
        { s: "«Окно» nimani bildiradi?", v: ["Deraza", "Devor", "Shift", "Pol"], t: 0, i: "Окно — deraza. Talaffuzi: «akno»." },
        { s: "«Дверь» nimani bildiradi?", v: ["Deraza", "Eshik", "Kalit", "Qulf"], t: 1, i: "Дверь — eshik. Откройте дверь — eshikni oching." },
        { s: "«Комната» nimani bildiradi?", v: ["Oshxona", "Xona", "Hammom", "Balkon"], t: 1, i: "Комната — xona. Oshxona: кухня." },
      ]},
      { nom: "🍞 Ovqat va ichimlik", savollar: [
        { s: "«Хлеб» nimani bildiradi?", v: ["Non", "Suv", "Go'sht", "Tuz"], t: 0, i: "Хлеб — non. Talaffuzi: «xlep»." },
        { s: "«Вода» nimani bildiradi?", v: ["Suv", "Sut", "Sharbat", "Choy"], t: 0, i: "Вода — suv. Talaffuzi: «vada»." },
        { s: "«Молоко» nimani bildiradi?", v: ["Qatiq", "Sut", "Smetana", "Ayron"], t: 1, i: "Молоко — sut. Talaffuzi: «malako»." },
        { s: "«Чай» nimani bildiradi?", v: ["Qahva", "Choy", "Suv", "Kompot"], t: 1, i: "Чай — choy. Qahva: кофе." },
        { s: "«Вкусно!» nimani bildiradi?", v: ["Achchiq!", "Mazali!", "Sovuq!", "Issiq!"], t: 1, i: "Вкусно — mazali. Очень вкусно! — juda mazali!" },
      ]},
      { nom: "🏃 Asosiy fe'llar", savollar: [
        { s: "«Идти» nimani bildiradi?", v: ["O'tirmoq", "Yurmoq / bormoq", "Yugurmoq", "Turmoq"], t: 1, i: "Идти — piyoda bormoq. Я иду домой — uyga ketyapman." },
        { s: "«Говорить» nimani bildiradi?", v: ["Eshitmoq", "Gapirmoq", "Ko'rmoq", "Yozmoq"], t: 1, i: "Говорить — gapirmoq. Я говорю по-русски." },
        { s: "«Читать» nimani bildiradi?", v: ["Yozmoq", "O'qimoq", "Sanamoq", "Chizmoq"], t: 1, i: "Читать — o'qimoq. Читать книгу — kitob o'qimoq." },
        { s: "«Я понимаю» nimani bildiradi?", v: ["Men bilaman", "Men tushunaman", "Men eslayman", "Men ko'raman"], t: 1, i: "Понимать — tushunmoq. Не понимаю — tushunmayapman." },
        { s: "«Жить» nimani bildiradi?", v: ["Ishlamoq", "Yashamoq", "Uxlamoq", "Kutmoq"], t: 1, i: "Жить — yashamoq. Я живу в Ташкенте." },
      ]},
      { nom: "🎨 Ranglar va sifatlar", savollar: [
        { s: "«Красный» qaysi rang?", v: ["Ko'k", "Qizil", "Yashil", "Sariq"], t: 1, i: "Красный — qizil. Красивый (chiroyli) bilan adashtirmang!" },
        { s: "«Большой» nimani bildiradi?", v: ["Kichkina", "Katta", "Uzun", "Yangi"], t: 1, i: "Большой — katta. Kichkina: маленький." },
        { s: "«Новый» nimani bildiradi?", v: ["Eski", "Yangi", "Toza", "Tez"], t: 1, i: "Новый — yangi. Eski: старый." },
        { s: "«Хороший» nimani bildiradi?", v: ["Yomon", "Yaxshi", "Chiroyli", "Katta"], t: 1, i: "Хороший — yaxshi. Хорошо! — yaxshi! (ravish)." },
        { s: "«Белый» qaysi rang?", v: ["Qora", "Oq", "Kulrang", "Jigarrang"], t: 1, i: "Белый — oq. Qora: чёрный." },
      ]},
    ],
  },
  A2: {
    nom: "A2 — Davomiy",
    tavsif: "Kundalik hayot, harakat, o'tgan zamon, shahar",
    darslar: [
      { nom: "⏰ Kundalik hayot", savollar: [
        { s: "«Я встаю в семь часов» nimani bildiradi?", v: ["Soat 7 da uxlayman", "Soat 7 da turaman", "7 soat ishlayman", "7 ta soatim bor"], t: 1, i: "Вставать — turmoq (o'rindan). Вставаю emas — встаю!" },
        { s: "«Обычно» nimani bildiradi?", v: ["Ba'zan", "Odatda", "Hech qachon", "Doim"], t: 1, i: "Обычно — odatda. Обычно я пью чай — odatda choy ichaman." },
        { s: "«Каждый день» nimani bildiradi?", v: ["Har hafta", "Har kuni", "Butun kun", "Kunduzi"], t: 1, i: "Каждый — har bir. Каждый день — har kuni." },
        { s: "«Отдыхать» nimani bildiradi?", v: ["Ishlamoq", "Dam olmoq", "Berib turmoq", "Nafas olmoq"], t: 1, i: "Отдыхать — dam olmoq. Отдых — dam olish." },
      ]},
      { nom: "🚶 Harakat fe'llari", savollar: [
        { s: "«Идти» va «ходить» farqi nimada?", v: ["Farqi yo'q", "Идти — hozir bir yo'nalishda, ходить — takroriy", "Ходить — yugurish", "Идти — transportda"], t: 1, i: "Я иду в школу (hozir) / Я хожу в школу (har kuni)." },
        { s: "«Ехать» nimani bildiradi?", v: ["Piyoda bormoq", "Transportda bormoq", "Uchmoq", "Suzmoq"], t: 1, i: "Ехать — mashina/avtobusda bormoq. Piyoda: идти." },
        { s: "«Летать» nimani bildiradi?", v: ["Sakramoq", "Uchmoq", "Yugurmoq", "Suzmoq"], t: 1, i: "Летать — uchmoq. Самолёт летает — samolyot uchadi." },
        { s: "«Я иду в кино» nimani bildiradi?", v: ["Kinoda edim", "Kinoga ketyapman", "Kino ko'raman", "Kinoni yoqtiraman"], t: 1, i: "Идти + в + joy — ...ga bormoq (hozir)." },
      ]},
      { nom: "⏳ O'tgan zamon", savollar: [
        { s: "O'tgan zamonda ayol jinsida fe'l qanday tugaydi?", v: ["-л", "-ла", "-ло", "-ли"], t: 1, i: "Он читал, она читала, они читали." },
        { s: "«Мы были дома» nimani bildiradi?", v: ["Biz uyga boramiz", "Biz uyda edik", "Bizning uyimiz bor", "Biz uydamiz"], t: 1, i: "Быть fe'lining o'tgan zamoni: был/была/были." },
        { s: "«Вчера» nimani bildiradi?", v: ["Ertaga", "Kecha", "Bugun", "Kechqurun"], t: 1, i: "Вчера — kecha. Ertaga: завтра. Kechqurun: вечером." },
        { s: "«Она сказала» nimani bildiradi?", v: ["U aytdi (ayol)", "U aytadi", "U eshitdi", "U so'radi"], t: 0, i: "Сказать — aytmoq (tugallangan). -ла — ayol jinsi." },
      ]},
      { nom: "🏙 Shahar va yo'l", savollar: [
        { s: "«Как пройти к метро?» nimani bildiradi?", v: ["Metro qachon ochiladi?", "Metroga qanday boriladi?", "Metro ishlayaptimi?", "Metro qimmatmi?"], t: 1, i: "Yo'l so'rashning asosiy iborasi. Javob: идите прямо — to'g'ri yuring." },
        { s: "«Направо» nimani bildiradi?", v: ["Chapga", "O'ngga", "To'g'riga", "Orqaga"], t: 1, i: "Направо — o'ngga, налево — chapga, прямо — to'g'riga." },
        { s: "«Остановка» nimani bildiradi?", v: ["Bekat", "Do'kon", "Chorraha", "Ko'prik"], t: 0, i: "Остановка — bekat (остановиться — to'xtamoq so'zidan)." },
        { s: "«Далеко» nimani bildiradi?", v: ["Yaqin", "Uzoq", "Tez", "Sekin"], t: 1, i: "Далеко — uzoq. Yaqin: близко." },
      ]},
      { nom: "🛍 Xarid qilish", savollar: [
        { s: "«Сколько это стоит?» nimani bildiradi?", v: ["Bu nima?", "Bu qancha turadi?", "Buni kim oldi?", "Bu qayerdan?"], t: 1, i: "Стоить — turmoq (narx). Qisqasi: Сколько?" },
        { s: "«Дорого» nimani bildiradi?", v: ["Arzon", "Qimmat", "Tekin", "Sifatli"], t: 1, i: "Дорого — qimmat. Arzon: дёшево." },
        { s: "«Деньги» nimani bildiradi?", v: ["Kunlar", "Pul", "Hujjat", "Chegirma"], t: 1, i: "Деньги — pul (doim ko'plikda ishlatiladi)." },
        { s: "«Магазин» nimani bildiradi?", v: ["Jurnal", "Do'kon", "Ombor", "Bozor"], t: 1, i: "Магазин — do'kon. Bozor: рынок / базар." },
      ]},
    ],
  },
  B1: {
    nom: "B1 — O'rta daraja",
    tavsif: "Aspekt, kelishiklar, fikr bildirish, iboralar",
    darslar: [
      { nom: "🔄 Fe'l turi (вид)", savollar: [
        { s: "«Читать» va «прочитать» farqi nimada?", v: ["Zamon farqi", "Davomiy va tugallangan ish", "Jins farqi", "Farqi yo'q"], t: 1, i: "Читать — jarayon, прочитать — natija. Bu — вид (aspekt)." },
        { s: "«Я сделал домашнее задание» — ish qanday?", v: ["Davom etyapti", "Tugallangan", "Boshlanmagan", "Takrorlanadi"], t: 1, i: "Сделать — совершенный вид: ish bitgan." },
        { s: "Qaysi juftlik to'g'ri (несов. → сов.)?", v: ["писать → написать", "писать → пописать", "читать → зачитать", "делать → доделать"], t: 0, i: "Ko'p fe'llarda со-/на-/про- old qo'shimchasi tugallanganlik beradi." },
        { s: "«Каждый день я делаю зарядку» — qaysi вид?", v: ["Совершенный", "Несовершенный", "Ikkalasi", "Aniqlab bo'lmaydi"], t: 1, i: "Takrorlanadigan ish — doim несовершенный вид." },
      ]},
      { nom: "📐 Kelishiklar amalda", savollar: [
        { s: "Rus tilida nechta kelishik bor?", v: ["4", "5", "6", "7"], t: 2, i: "6 ta: им., род., дат., вин., твор., предл." },
        { s: "«Я читаю книгу» — «книгу» qaysi kelishikda?", v: ["Именительный", "Родительный", "Винительный", "Дательный"], t: 2, i: "Nima o'qiyapman? — винительный: книга → книгу." },
        { s: "«У меня есть...» dagi «меня» qaysi kelishik?", v: ["Родительный", "Дательный", "Творительный", "Именительный"], t: 0, i: "У + родительный: у меня, у тебя, у него." },
        { s: "«Я живу в Ташкенте» — «Ташкенте» qaysi kelishik?", v: ["Винительный", "Предложный", "Дательный", "Родительный"], t: 1, i: "Qayerda? — в/на + предложный kelishik." },
      ]},
      { nom: "💬 Fikr bildirish", savollar: [
        { s: "«Я считаю, что...» nimani bildiradi?", v: ["Men sanayapmanki", "Men hisoblaymanki / fikrimcha", "Men ko'rdimki", "Men eshitdimki"], t: 1, i: "Считать — sanamoq va hisoblamoq (fikr). Suhbatda juda ko'p." },
        { s: "«По-моему» nimani bildiradi?", v: ["Mening uyimda", "Menimcha", "Men bo'yicha", "Menga"], t: 1, i: "По-моему — menimcha. Yana: на мой взгляд." },
        { s: "«Согласен» nimani bildiradi?", v: ["Qarshiman", "Roziman", "Bilmayman", "Shubham bor"], t: 1, i: "Согласен (erkak) / согласна (ayol) — roziman." },
        { s: "«Может быть» nimani bildiradi?", v: ["Bo'lishi kerak", "Balki", "Albatta", "Hech qachon"], t: 1, i: "Может быть — balki. Qisqasi: может." },
      ]},
      { nom: "💼 Ish va o'qish", savollar: [
        { s: "«Собеседование» nimani bildiradi?", v: ["Yig'ilish", "Suhbat (intervyu)", "Imtihon", "Dars"], t: 1, i: "Ishga kirishdagi suhbat. Беседа — suhbat so'zidan." },
        { s: "«Зарплата» nimani bildiradi?", v: ["Soliq", "Maosh", "Mukofot", "Qarz"], t: 1, i: "Зарплата = заработная плата — ish haqi." },
        { s: "«Учиться» nimani bildiradi?", v: ["O'rgatmoq", "O'qimoq (ta'lim olmoq)", "Ishlamoq", "Dam olmoq"], t: 1, i: "Учиться — o'qimoq (universitetda). O'rgatmoq: учить кого-то." },
        { s: "«Опыт работы» nimani bildiradi?", v: ["Ish joyi", "Ish tajribasi", "Ish vaqti", "Ish haqi"], t: 1, i: "Опыт — tajriba. Rezyumeda doim so'raladi." },
      ]},
      { nom: "🗯 Jonli iboralar", savollar: [
        { s: "«Иметь в виду» nimani bildiradi?", v: ["Ko'rib turmoq", "Nazarda tutmoq", "Esda saqlamoq", "Ko'z tikmoq"], t: 1, i: "Что ты имеешь в виду? — nima demoqchisan?" },
        { s: "«Короче» so'zlashuvda nimani bildiradi?", v: ["Kaltaroq", "Xullas / qisqasi", "Tezroq", "Ozroq"], t: 1, i: "Gapni boshlash/yakunlashda: «xullas»." },
        { s: "«Ничего себе!» nimani bildiradi?", v: ["O'zimga hech narsa", "Voy-bo'y! / Qoyil!", "Menga baribir", "Hechqisi yo'q"], t: 1, i: "Hayrat undovi. So'zma-so'z tarjima qilinmaydi." },
        { s: "«Ладно» nimani bildiradi?", v: ["Yo'q", "Xo'p / mayli", "Keyin", "To'xta"], t: 1, i: "Ладно — rozilik. Ну ладно — bo'pti, mayli." },
      ]},
    ],
  },
  B2: {
    nom: "B2 — Yuqori daraja",
    tavsif: "Shart mayli, sifatdosh, murakkab iboralar",
    darslar: [
      { nom: "🤔 Shart mayli (бы)", savollar: [
        { s: "«Если бы у меня было время...» nimani bildiradi?", v: ["Vaqtim bo'lganda edi...", "Vaqtim bor", "Vaqtim bo'ladi", "Vaqt so'rayapman"], t: 0, i: "бы + o'tgan zamon = shart mayli (real bo'lmagan holat)." },
        { s: "«Я бы хотел» nimani bildiradi?", v: ["Men xohlayman", "Men xohlar edim", "Men xohladim", "Men xohlamayman"], t: 1, i: "Muloyim istak: Я бы хотел кофе — kofe olsam devdim." },
        { s: "«бы» yuklamasi qaysi zamon bilan ishlatiladi?", v: ["Hozirgi", "Kelasi", "O'tgan", "Istalgan"], t: 2, i: "Доим o'tgan zamon shakli bilan: сделал бы, пошёл бы." },
        { s: "«На твоём месте я бы...» nimani bildiradi?", v: ["Sening joyingda o'tiribman", "Sening o'rningda men...", "Men senga joy beraman", "Joyingni almashtir"], t: 1, i: "Maslahat berishning klassik shakli." },
      ]},
      { nom: "📖 Sifatdosh va ravishdosh", savollar: [
        { s: "«Читающий человек» nimani bildiradi?", v: ["O'qigan odam", "O'qiyotgan odam", "O'qituvchi", "Kitobxon"], t: 1, i: "-ющий — hozirgi zamon sifatdoshi: o'qiyotgan." },
        { s: "«Прочитав книгу, я лёг спать» — «прочитав» nima?", v: ["Fe'l", "Ravishdosh (o'qib bo'lib)", "Sifatdosh", "Ot"], t: 1, i: "-в/-вши — ravishdosh: ishni bajarib bo'lib." },
        { s: "«Сделанный» nimani bildiradi?", v: ["Qilayotgan", "Qilingan", "Qiladigan", "Qilmoqchi"], t: 1, i: "-нный — majhul sifatdosh: qilingan ish." },
        { s: "«Говоря по-русски, я волнуюсь» — «говоря» nima?", v: ["Ravishdosh (gapira turib)", "Sifatdosh", "Ot", "Ravish"], t: 0, i: "-я — hozirgi zamon ravishdoshi: gapira turib." },
      ]},
      { nom: "🧩 Murakkab bog'lovchilar", savollar: [
        { s: "«Несмотря на то, что...» nimani bildiradi?", v: ["...ga qarab", "...ga qaramay", "...dan keyin", "...dan oldin"], t: 1, i: "Несмотря на дождь — yomg'irga qaramay." },
        { s: "«Дело в том, что...» nimani bildiradi?", v: ["Ish shundaki", "Gap shundaki...", "Muammo yo'q", "Ish tugadi"], t: 1, i: "Tushuntirishni boshlash uchun eng ko'p ishlatiladigan ibora." },
        { s: "«В течение недели» nimani bildiradi?", v: ["Bir haftadan keyin", "Bir hafta davomida", "Har hafta", "O'tgan hafta"], t: 1, i: "В течение + род. kelishik — davomida." },
        { s: "«Благодаря тебе» nimani bildiradi?", v: ["Senga rahmat aytib", "Sening tufayling / sharofating bilan", "Senga qaramay", "Sen uchun"], t: 1, i: "Благодаря — ijobiy sabab. Salbiy sabab: из-за." },
      ]},
      { nom: "😎 So'zlashuv uslubi (PRO)", savollar: [
        { s: "«Да ладно!» hayrat bilan aytilsa nimani bildiradi?", v: ["Xo'p mayli", "Yo'g'-e! / Rostdanmi?!", "Bas qil", "Albatta"], t: 1, i: "Ohangga qarab ma'no o'zgaradi — hayratda: «yo'g'-e!»" },
        { s: "«Понятия не имею» nimani bildiradi?", v: ["Tushuncham bor", "Umuman bilmayman", "Tushunmadim", "Bilishni xohlamayman"], t: 1, i: "Kuchli «bilmayman». Oddiysi: не знаю." },
        { s: "«Как бы то ни было» nimani bildiradi?", v: ["Qanday bo'lmasin / nima bo'lganda ham", "Qanday bo'ldi?", "Hech qanday", "Balki bo'lar"], t: 0, i: "Kitobiy ibora: nima bo'lganda ham / baribir." },
        { s: "«Честно говоря» nimani bildiradi?", v: ["Halol ishlab", "Ochig'ini aytganda", "Sekin gapirib", "Baland ovozda"], t: 1, i: "Честно говоря — ochig'ini aytganda. Yana: если честно." },
      ]},
    ],
  },
};
