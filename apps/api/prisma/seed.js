import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const db = new PrismaClient();
const t=(ru,kg,en)=>({ru,kg,en});
const regions=[
 ['chuy','Чүй','Чүй','Chuy','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400'],
 ['issyk-kul','Ысык-Көл','Ысык-Көл','Issyk-Kul','https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1400'],
 ['naryn','Нарын','Нарын','Naryn','https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1400'],
 ['talas','Талас','Талас','Talas','https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400'],
 ['osh','Ош','Ош','Osh','https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400'],
 ['jalal-abad','Жалал-Абад','Жалал-Абад','Jalal-Abad','https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400'],
 ['batken','Баткен','Баткен','Batken','https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=1400']
];
const sites=[
 ['burana','chuy','Башня Бурана','Бурана мунарасы','Burana Tower',42.747,75.25,'XI век','Башня — сохранившийся минарет средневекового Баласагуна.','https://whc.unesco.org/en/list/1442/'],
 ['ak-beshim','chuy','Ак-Бешим','Ак-Бешим','Ak-Beshim',42.8,75.2,'Средневековье','Археологическое городище, связанное с древним Суябом.','https://whc.unesco.org/en/list/1442/'],
 ['cholpon-petroglyphs','issyk-kul','Петроглифы Чолпон-Аты','Чолпон-Ата петроглифтери','Cholpon-Ata Petroglyphs',42.65,77.08,'Древность','Музей под открытым небом с древними наскальными изображениями.','https://www.visitkyrgyzstan.kg/'],
 ['karakol-mosque','issyk-kul','Дунганская мечеть Каракола','Караколдогу дунган мечити','Karakol Dungan Mosque',42.49,78.39,'XX век','Деревянная мечеть — заметный памятник архитектуры Каракола.','https://www.visitkyrgyzstan.kg/'],
 ['tash-rabat','naryn','Таш-Рабат','Таш-Рабат','Tash Rabat',40.82,75.29,'Средневековье','Каменный караван-сарай в высокогорной долине.','https://www.visitkyrgyzstan.kg/'],
 ['koshoy-korgon','naryn','Кошой-Коргон','Кошой-Коргон','Koshoy Korgon',41.17,75.8,'Средневековье','Остатки древней крепости в Ат-Башинской долине.','https://www.visitkyrgyzstan.kg/'],
 ['manas-ordo','talas','Манас-Ордо','Манас-Ордо','Manas Ordo',42.52,71.82,'Культурное наследие','Историко-культурный комплекс, связанный с эпосом «Манас».','https://www.visitkyrgyzstan.kg/'],
 ['uzgen','osh','Узгенский комплекс','Өзгөн комплекси','Uzgen Complex',40.77,73.3,'XI–XII века','Средневековые мавзолеи и минарет эпохи Караханидов.','https://whc.unesco.org/'],
 ['shah-fazil','jalal-abad','Шах-Фазиль','Шах-Фазил','Shah Fazil',41.52,71.45,'Средневековье','Исторический мавзолей и часть сакрального комплекса.','https://www.visitkyrgyzstan.kg/'],
 ['saimaluu-tash','jalal-abad','Саймалуу-Таш','Саймалуу-Таш','Saimaluu Tash',41.19,73.8,'Древность','Высокогорное собрание наскальных изображений.','https://whc.unesco.org/'],
 ['kan-i-gut','batken','Кан-и-Гут','Кан-и-Гут','Kan-i-Gut',39.95,70.3,'Исторический объект','Историческая пещера-рудник; посещение требует отдельной проверки доступности.','https://www.visitkyrgyzstan.kg/'],
 ['aigul-tash','batken','Айгуль-Таш','Айгүл-Таш','Aigul-Tash',40.05,70.85,'Природное наследие','Местность, известная редким цветком Айгуль; важно соблюдать природоохранные правила.','https://www.visitkyrgyzstan.kg/']
];
const photo=['photo-1464822759023-fed622ff2c3b','photo-1500534623283-312aade485b7','photo-1470770841072-f978cf4d019e','photo-1501785888041-af3ef285b470','photo-1519681393784-d120267933ba'];
async function main(){
 const adminEmail=process.env.SEED_ADMIN_EMAIL || 'admin@konok.local';const adminPassword=process.env.SEED_ADMIN_PASSWORD;
 if(adminPassword && adminPassword.length>=10) await db.user.upsert({where:{email:adminEmail},update:{},create:{email:adminEmail,name:'KONOK Admin',role:'ADMIN',passwordHash:await bcrypt.hash(adminPassword,12)}});
 for(const [slug,ru,kg,en,cover] of regions) await db.region.upsert({where:{slug},update:{},create:{slug,name:t(ru,kg,en),description:t('История, культура и природа региона','Аймактын тарыхы, маданияты жана жаратылышы','Heritage, culture and nature of the region'),cover}});
 for(let i=0;i<sites.length;i++){const [slug,reg,ru,kg,en,latitude,longitude,era,desc,sourceUrl]=sites[i];const region=await db.region.findUnique({where:{slug:reg}});await db.heritageSite.upsert({where:{slug},update:{},create:{slug,regionId:region.id,title:t(ru,kg,en),summary:t(desc,desc,desc),history:t(desc+' Исторические сведения требуют проверки по первоисточникам перед публичным использованием.',desc,desc),era,category:'HERITAGE',latitude,longitude,image:`https://images.unsplash.com/${photo[i%photo.length]}?w=1200`,sourceTitle:'Ссылка для дальнейшей редакционной проверки',sourceUrl,accessNotes:t('Уточните условия посещения перед поездкой.','Барардан мурда шарттарды тактаңыз.','Check access conditions before travelling.')}})}
 for(let i=1;i<=18;i++){const slug=`craft-${i}`;await db.product.upsert({where:{slug},update:{},create:{slug,name:t(`Изделие мастера №${i}`,`Устанын буюму №${i}`,`Handmade craft #${i}`),description:t('Демонстрационный товар.','Демо товар.','Demo product.'),category:['FELT','JEWELRY','SOUVENIR'][i%3],price:450+i*130,stock:10+i,image:`https://images.unsplash.com/${photo[i%photo.length]}?w=900`}})}
 for(let i=0;i<sites.length;i++){const slug=`heritage-tour-${i+1}`;const site=await db.heritageSite.findUnique({where:{slug:sites[i][0]}});const e=await db.experience.upsert({where:{slug},update:{},create:{slug,siteId:site.id,title:t(`Экскурсия: ${sites[i][2]}`,`Экскурсия: ${sites[i][3]}`,`Guided visit: ${sites[i][4]}`),description:t('Демонстрационная экскурсия, не реальная услуга.','Демо экскурсия.','Demo experience, not a real booking.'),price:1200+i*100,duration:'3 часа',image:site.image,capacity:12}});for(let day=1;day<=7;day++){const dt=new Date(Date.now()+(day+3)*86400000);dt.setUTCHours(7,0,0,0);await db.schedule.upsert({where:{id:`seed-${i}-${day}`},update:{},create:{id:`seed-${i}-${day}`,experienceId:e.id,startsAt:dt,capacity:12}})}}
 await db.setting.upsert({where:{key:'atmosphere'},update:{},create:{key:'atmosphere',value:{enabled:false,url:'',volume:0.25}}});await db.setting.upsert({where:{key:'contact'},update:{},create:{key:'contact',value:{whatsapp:'',telegramEnabled:false}}});
 console.log('Seed completed: 7 regions, 12 sites, 12 experiences, 18 products. Admin created only if SEED_ADMIN_PASSWORD is set.');
}
main().finally(()=>db.$disconnect());
