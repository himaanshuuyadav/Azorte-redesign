export type Store = {
  state: string;
  city: string;
  mall: string;
  address: string;
  mapsUrl: string;
};

export type StatePin = {
  x: string;
  y: string;
};

export const STATE_PINS: Record<string, StatePin> = {
  'Assam': { x: '77.6%', y: '39.4%' },
  'Bihar': { x: '57.6%', y: '41.1%' },
  'Chhattisgarh': { x: '47.4%', y: '53.3%' },
  'Delhi': { x: '34.4%', y: '32.0%' },
  'Goa': { x: '26.2%', y: '71.4%' },
  'Gujarat': { x: '19.9%', y: '48.1%' },
  'Haryana': { x: '32.3%', y: '30.5%' },
  'Jharkhand': { x: '56.4%', y: '47.6%' },
  'Karnataka': { x: '30.2%', y: '72.8%' },
  'Maharashtra': { x: '30.6%', y: '59.8%' },
  'Punjab': { x: '30.1%', y: '25.4%' },
  'Rajasthan': { x: '25.7%', y: '37.6%' },
  'Tamil Nadu': { x: '38.0%', y: '83.6%' },
  'Telangana': { x: '39.7%', y: '64.2%' },
  'Uttar Pradesh': { x: '43.9%', y: '37.6%' },
  'Uttarakhand': { x: '40.1%', y: '27.2%' },
};

export const STORE_DATA: Store[] = [
  { state: 'Assam', city: 'Guwahati', mall: 'Golden Heights Building', address: 'Golden Heights Building, Ground Floor, GS Rd, Christian Basti, Guwahati, Assam 781005', mapsUrl: 'https://maps.google.com/maps?cid=2998440461937042814' },
  { state: 'Bihar', city: 'Patna', mall: 'Durga Aspire', address: 'Durga Aspire, GF, FF, SF, E Boring Canal Road, Sri Krishna Nagar, Patna, Bihar 800001', mapsUrl: 'https://maps.google.com/maps?cid=10000933735184038347' },
  { state: 'Chhattisgarh', city: 'Raipur', mall: 'Raipur City Center Mall', address: 'Raipur City Center Mall, Orange eye resort mandi, piche, Devendra Nagar, Dumartara, Raipur, Chhattisgarh 492004', mapsUrl: 'https://maps.google.com/maps?cid=12662502227660859802' },
  { state: 'Delhi', city: 'Delhi', mall: 'Vegas Mall', address: 'Vegas Mall, 1st Floor, Pocket 1, Sector 14, Dwarka, Delhi 110075', mapsUrl: 'https://maps.google.com/maps?cid=805195176445906716' },
  { state: 'Goa', city: 'Madgaon', mall: 'Sapana Grandeur', address: 'Ground & First Floor, Sapana Grandeur, Aquem Alto, Davarlim, Madgaon, Goa 403601', mapsUrl: 'https://maps.google.com/maps?cid=2566853771375000917' },
  { state: 'Gujarat', city: 'Ahmedabad', mall: 'Stratum @ Venus Grounds', address: 'Stratum @ Venus Grounds, Ground Floor, Near Jhansi ki Rani Statue, Nehru Nagar, Satellite, Ahmedabad, Gujarat 380015', mapsUrl: 'https://maps.google.com/maps?cid=636671844697668759' },
  { state: 'Gujarat', city: 'Vastrapur', mall: 'Unit no LG 01', address: 'Unit no LG 01, Final PLOT NUMBER 216 PAIKI OF VASTRAPUR, TPS 1, Ahmedabad, Gujarat 380054', mapsUrl: 'https://maps.google.com/maps?cid=9988974030706445638' },
  { state: 'Gujarat', city: 'Jamnagar', mall: 'The Mall', address: 'The Mall, Reliance Greens, Motikhavdi, Jamnagar, Gujarat 361142', mapsUrl: 'https://maps.google.com/maps?cid=10407521186792209191' },
  { state: 'Gujarat', city: 'Surat', mall: 'Aashirwad High Street Mall', address: 'Aashirwad High Street Mall, First & Second Floor, City Light Rd, City Light Town, Athwa, Surat, Gujarat 395007', mapsUrl: 'https://maps.google.com/maps?cid=18039722162813121078' },
  { state: 'Gujarat', city: 'Surat', mall: 'Vip Road', address: 'Vip Road, Canal Road Corner, Near CB Patel Club, Surat, Gujarat 395007', mapsUrl: 'https://maps.google.com/maps?cid=17637038596287862063' },
  { state: 'Gujarat', city: 'Vadodara', mall: 'Sarabhai Campus', address: '73 East Avenue, Sarabhai Campus, Ground & First Floor Near Genda Circle, Road, Gorwa, Vadodara, Gujarat 390023', mapsUrl: 'https://maps.google.com/maps?cid=11278882604083678355' },
  { state: 'Haryana', city: 'Faridabad', mall: 'Pacific Mall', address: 'Pacific Mall, SHGF05, GF & SH1F06, FF, Sec 20, Faridabad, Haryana 121001', mapsUrl: 'https://maps.google.com/maps?cid=4903516040766581576' },
  { state: 'Haryana', city: 'Gurugram', mall: 'Airia Mall', address: 'Airia Mall, Ground & First Floor, Badshahpur Sohna Rd Hwy, Sector 68, Gurugram, Haryana 122103', mapsUrl: 'https://maps.google.com/maps?cid=13130417438333534640' },
  { state: 'Haryana', city: 'Gurugram', mall: 'Sector 29', address: 'GF, FF, SF, SCO No. 335 , 336 and 337, Sector 29, Urban Estate, Tehsil Wazirabad, Gurugram, Haryana 122007', mapsUrl: 'https://maps.google.com/maps?cid=6350399897037277905' },
  { state: 'Jharkhand', city: 'Ranchi', mall: 'JD Hi Street Mall', address: 'JD Hi Street Mall, Ground floor, Mahatma Gandhi Main Rd, opposite GEL Church Complex, Hindpiri, Ranchi, Jharkhand 834001', mapsUrl: 'https://maps.google.com/maps?cid=17560674622746922634' },
  { state: 'Jharkhand', city: 'Ranchi', mall: 'Pristine Paradise', address: 'Pristine Paradise, GF,FF,SF, Opp CMPDI, Kanke Road, Missirgonda, Kanke, Ranchi, Jharkhand 834008', mapsUrl: 'https://maps.google.com/maps?cid=615285039926741726' },
  { state: 'Karnataka', city: 'Bangalore', mall: '1MG Mall', address: '1MG Mall, Level 2 & 3, Mahatma Gandhi Rd, Yellappa Garden, Bangalore, Karnataka 560008', mapsUrl: 'https://maps.google.com/maps?cid=16071262156262714770' },
  { state: 'Karnataka', city: 'Bangalore', mall: 'Ashrith Aries', address: 'Ground Floor, First Floor & Second Floor Ashrith Aries, 53/1 Sarjapur Main Road, Bangalore, Karnataka 560035', mapsUrl: 'https://maps.google.com/maps?cid=7559890498996735781' },
  { state: 'Karnataka', city: 'Bangalore', mall: 'Phoenix Mall of Asia', address: 'Phoenix Mall of Asia, North Bengaluru, Sahakar Nagar, Bangalore, Karnataka 560092', mapsUrl: 'https://maps.google.com/maps?cid=9047290282962276301' },
  { state: 'Karnataka', city: 'Bangalore', mall: 'LULU Mall Bengaluru', address: 'LULU Mall Bengaluru, Unit FF-01A, FF, M 19/2, Mysore Deviation Road, Gopalapura, Bangalore, Karnataka 560023', mapsUrl: 'https://maps.google.com/maps?cid=12418798000095739801' },
  { state: 'Karnataka', city: 'Bangalore', mall: 'Shravanee Premier', address: 'Shravanee Premier, Ground Floor, Ashoka Pillar Road, 2nd Block, Jayanagar, Bangalore, Karnataka 560011', mapsUrl: 'https://maps.google.com/maps?cid=13777387649282268776' },
  { state: 'Karnataka', city: 'Bangalore', mall: 'Vega City Mall', address: 'Vega City Mall, Lower Ground, Bannerghatta Rd, Dollar Layout, BTM Layout, Bangalore, Karnataka 560076', mapsUrl: 'https://maps.google.com/maps?cid=525724603389915281' },
  { state: 'Karnataka', city: 'Bengaluru', mall: 'HSR Layout', address: 'GF, FF, SF, No 2326, BBMP E-Katha, property No 1916/2326, Sector1, HSR Layout Sarjapur Road, Bengaluru, Karnataka 560102', mapsUrl: 'https://maps.google.com/maps?cid=8325235902428149778' },
  { state: 'Karnataka', city: 'Udupi', mall: 'Amrut Enclave', address: 'Ground & First Floor, Amrut Enclave, Manipal Road, next to Mandavi Times Square Mall, Kalsanka, Udupi, Karnataka 576101', mapsUrl: 'https://maps.google.com/maps?cid=992853230218106387' },
  { state: 'Maharashtra', city: 'Mumbai', mall: 'Sky City Mall', address: 'Sky City Mall, Devipada, Khande Rao Dongari, Borivali, Mumbai, Maharashtra 400066', mapsUrl: 'https://maps.google.com/maps?cid=6733097277157007344' },
  { state: 'Maharashtra', city: 'Mumbai', mall: 'Infiniti Mall', address: 'Infiniti Mall Malad, Lower Ground Floor, New Link Rd Malad, Mindspace, Malad West, Mumbai, Maharashtra 400064', mapsUrl: 'https://maps.google.com/maps?cid=17108807026232691607' },
  { state: 'Maharashtra', city: 'Mumbai', mall: 'Nexus Seawoods', address: 'Nexus Seawoods Mall, First Floor, Nerul East, Sector 30, Nerul, Mumbai, Maharashtra 400706', mapsUrl: 'https://maps.google.com/maps?cid=942013352869653633' },
  { state: 'Maharashtra', city: 'Kurla', mall: 'Phoenix Marketcity', address: 'Phoenix Marketcity, Lal Bahadur Shastri Marg, Patelwadi Kurla, Kurla West, Kurla, Mumbai, Maharashtra 400070', mapsUrl: 'https://maps.google.com/maps?cid=16359072074190743569' },
  { state: 'Maharashtra', city: 'Ghatkopar', mall: 'R CITY', address: 'R CITY, Lal Bahadur Shastri Marg, Amrut Nagar, Ghatkopar West, Mumbai, Maharashtra 400086', mapsUrl: 'https://maps.google.com/maps?cid=11028291065723251739' },
  { state: 'Maharashtra', city: 'Navi Mumbai', mall: 'Inorbit Mall', address: 'Inorbit Mall, Ground Floor, Palm Beach Rd, Sector 30A, Vashi, Navi Mumbai, Maharashtra 400705', mapsUrl: 'https://maps.google.com/maps?cid=5822949463297257251' },
  { state: 'Maharashtra', city: 'Pune', mall: 'Amanora Mall', address: 'Amanora Mall, GF, Mundhwa - Kharadi Rd, Amanora Park Town, Hadapsar, Pune, Maharashtra 411028', mapsUrl: 'https://maps.google.com/maps?cid=17833686963643680131' },
  { state: 'Maharashtra', city: 'Pune', mall: 'Phoenix Mall of the Millennium', address: 'Phoenix Mall of the Millennium, Ground and Upper Ground, Near Pune - Bengaluru Highway, Shankar Kalat Nagar, Wakad, Pune, Maharashtra 411057', mapsUrl: 'https://maps.google.com/maps?cid=9040779282873269279' },
  { state: 'Maharashtra', city: 'Pune', mall: 'The Pavillion Mall', address: 'The Pavillion Mall, Ground, First & Second Floor, Senapati Bapat Rd, Vaiavadi, Laxmi Society, Pune, Maharashtra 411016', mapsUrl: 'https://maps.google.com/maps?cid=16368096937969824011' },
  { state: 'Maharashtra', city: 'Thane', mall: 'Viviana Mall', address: 'Viviana Mall, Ground Floor, On Eastern Express Highway, Service Rd, Thane West, Thane, Maharashtra 400606', mapsUrl: 'https://maps.google.com/maps?cid=16975647048009132340' },
  { state: 'Punjab', city: 'Amritsar', mall: 'Nexus Amritsar Mall', address: 'Nexus Amritsar Mall, First Floor, MBM Farm, Grand Trunk Rd, Amritsar, Punjab 143001', mapsUrl: 'https://maps.google.com/maps?cid=5623931291519465518' },
  { state: 'Rajasthan', city: 'Jaipur', mall: 'GT Square', address: 'Ground floor, GT Square, Gaurav Tower Marg, Kalyan Colony, D-Block, Sector 4, Malviya Nagar, Jaipur, Rajasthan 302017', mapsUrl: 'https://maps.google.com/maps?cid=10792805990118362179' },
  { state: 'Rajasthan', city: 'Udaipur', mall: 'Nexus Celebration Mall', address: 'Ground & First floor, Nexus Celebration Mall, Bhuwana Rd, Opposite Devendra Dham, Pulla Bhuwana, Udaipur, Rajasthan 313004', mapsUrl: 'https://maps.google.com/maps?cid=13057491112059421959' },
  { state: 'Tamil Nadu', city: 'Chennai', mall: 'PHOENIX MARKET CITY', address: 'PHOENIX MARKET CITY, 142, Velachery Road, Indira Gandhi Nagar, Velachery, Chennai, Tamil Nadu 600042', mapsUrl: 'https://maps.google.com/maps?cid=4259926925521205234' },
  { state: 'Tamil Nadu', city: 'Chennai', mall: 'VR Chennai', address: 'VR Chennai, First Floor, Unit F-5, 6A, Shop No. 44, Pillaiyar Koil Street, Jawahar Nehru Road, Anna Nagar, Chennai, Tamil Nadu 600040', mapsUrl: 'https://maps.google.com/maps?cid=3293696232705338525' },
  { state: 'Telangana', city: 'Hyderabad', mall: 'Inorbit Mall', address: 'Cyberabad Level 1, Inorbit Mall, APIIC Software Layout, Madhapur, Hyderabad, Telangana 500081', mapsUrl: 'https://maps.google.com/maps?cid=11316546666216400417' },
  { state: 'Telangana', city: 'Hyderabad', mall: 'Lakeshore Mall', address: 'Lakeshore Mall FCHF+53P, Amma Mess Road, Prashanti Nagar, Y Junction Kukatpally, Hyderabad, Telangana 500072', mapsUrl: 'https://maps.google.com/maps?cid=15888093840466413453' },
  { state: 'Telangana', city: 'Hyderabad', mall: 'Sarath City Capital Mall', address: 'Upper Ground and 1st Floor, Sarath City Capital Mall, Gachibowli - Miyapur Road, Whitefields, HITEC City, Hyderabad, Telangana 500084', mapsUrl: 'https://maps.google.com/maps?cid=9207982883882054338' },
  { state: 'Telangana', city: 'Hyderabad', mall: 'Aparna Neo Mall', address: 'Aparna Neo Mall, Upper Ground Floor & First Floor, Nallagandla Road, Nallagandla, Telangana 500019', mapsUrl: 'https://maps.google.com/maps?cid=12318334423873306575' },
  { state: 'Uttar Pradesh', city: 'Lucknow', mall: 'Lulu Shoping Mall', address: 'First Floor, Lulu Shoping Mall, Amar Shaheed Path, Gold City, Sector B Ansal API, Lucknow, Uttar Pradesh 226030', mapsUrl: 'https://maps.google.com/maps?cid=15942643917493962627' },
  { state: 'Uttar Pradesh', city: 'Lucknow', mall: 'Phoenix Palassio', address: 'Phoenix Palassio Market City Mall, 1st Floor, Unit No. - F56, Sector 7, Gomti Nagar Extension, Lucknow, Uttar Pradesh 226010', mapsUrl: 'https://maps.google.com/maps?cid=11958305717295194557' },
  { state: 'Uttarakhand', city: 'Dehradun', mall: 'Mall of Dehradun', address: 'Ground & Upper Ground Floor, Mall of Dehradun, IIP, Mohkampur, Mohkam Pur Khurd, Dehradun, Uttarakhand 248005', mapsUrl: 'https://maps.google.com/maps?cid=11752314498220143981' }
];
