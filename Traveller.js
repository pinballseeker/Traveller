// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: plane;
//
// Traveller.js
// https://github.com/pinballseeker/Traveller/
// - This is the code for a Scriptable widget, see https://scriptable.app.

/*
 * Parameters
 *
 * currencyApiKey: [REQUIRED] Your freecurrencyapi.com API Key, get yours here: https://freecurrencyapi.com
 * foreignCurrency: The currency of the country you are visiting.
 * myCurrency: The currencies you would like the local currency to be converted to (only 2 values allowed).
 * country: The country you are visiting, just for display purposes.
 * moneyValues: The values of the local currency to show and convert by default (8 values).
 *
 * Attempts to load parameters in this order:
 * 1. Widget parameters
 * 2. JSON file "./scriptname.json"
 * 3. Hard-coded parameters right here:
 */
const scriptParams = {
	currencyApiKey: 'YOUR_API_KEY',
	foreignCurrency: 'ISK',
	myCurrency: 'EUR',
	country: 'Iceland',
	moneyValues: [100,250,500,750,1000,2500,5000,10000]
}

const widgetParams = args.widgetParameter ? JSON.parse(args.widgetParameter) : undefined;
let storedParams;
try {
	storedParams = jsonFileManager.read(Script.name() + ".json");
} catch (err) {
	console.log(err);
}
const params = widgetParams || storedParams || scriptParams;


/**
 * Class that can read and write JSON objects using the file system.
 *
 * This is a minified version but it can be replaced with the full version by copy pasting this code!
 * https://github.com/stanleyrya/scriptable-playground/blob/main/json-file-manager/json-file-manager.js
 *
 * Usage:
 *  * write(relativePath, jsonObject): Writes JSON object to a relative path.
 *  * read(relativePath): Reads JSON object from a relative path.
 */
class JSONFileManager{write(e,r){const t=this.getFileManager(),i=this.getCurrentDir()+e,l=e.split("/");if(l>1){const e=l[l.length-1],r=i.replace("/"+e,"");t.createDirectory(r,!0)}if(t.fileExists(i)&&t.isDirectory(i))throw"JSON file is a directory, please delete!";t.writeString(i,JSON.stringify(r))}read(e){const r=this.getFileManager(),t=this.getCurrentDir()+e;if(!r.fileExists(t))throw"JSON file does not exist! Could not load: "+t;if(r.isDirectory(t))throw"JSON file is a directory! Could not load: "+t;r.downloadFileFromiCloud(t);const i=JSON.parse(r.readString(t));if(null!==i)return i;throw"Could not read file as JSON! Could not load: "+t}getFileManager(){try{return FileManager.iCloud()}catch(e){return FileManager.local()}}getCurrentDir(){const e=this.getFileManager(),r=module.filename;return r.replace(e.fileName(r,!0),"")}}
const jsonFileManager = new JSONFileManager();

/**
 * Method to get JSON results from API call
*/
async function get(opts) {
      const request = new Request(opts.url)
      request.headers = {
        ...opts.headers,
        ...this.defaultHeaders
      }
      var result=await request.loadJSON()
      return result
}

/**
 * Method to load image
 */
async function loadImage(imgUrl) {
	let req = new Request(imgUrl)
	let image = await req.loadImage()
	return image
}

/*
 * Get currency data
 */
const resp = await get({url:"https://api.freecurrencyapi.com/v1/latest?apikey=" + params.currencyApiKey + "&currencies=" + params.myCurrency + "&base_currency=" + params.foreignCurrency})

/*
 * Basic colours used throughout
 */
const color = {
	"white": new Color("#ffffff")
}

/*
 * Function to display currency symbol
 */
const currencySymbolMap = module.exports={AED:"د.إ",AFN:"؋",ALL:"L",AMD:"֏",ANG:"ƒ",AOA:"Kz",ARS:"$",AUD:"$",AWG:"ƒ",AZN:"₼",BAM:"KM",BBD:"$",BDT:"৳",BGN:"лв",BHD:".د.ب",BIF:"FBu",BMD:"$",BND:"$",BOB:"$b",BOV:"BOV",BRL:"R$",BSD:"$",BTC:"₿",BTN:"Nu.",BWP:"P",BYN:"Br",BYR:"Br",BZD:"BZ$",CAD:"$",CDF:"FC",CHE:"CHE",CHF:"CHF",CHW:"CHW",CLF:"CLF",CLP:"$",CNH:"\xa5",CNY:"\xa5",COP:"$",COU:"COU",CRC:"₡",CUC:"$",CUP:"₱",CVE:"$",CZK:"Kč",DJF:"Fdj",DKK:"kr",DOP:"RD$",DZD:"دج",EEK:"kr",EGP:"\xa3",ERN:"Nfk",ETB:"Br",ETH:"Ξ",EUR:"€",FJD:"$",FKP:"\xa3",GBP:"\xa3",GEL:"₾",GGP:"\xa3",GHC:"₵",GHS:"GH₵",GIP:"\xa3",GMD:"D",GNF:"FG",GTQ:"Q",GYD:"$",HKD:"$",HNL:"L",HRK:"kn",HTG:"G",HUF:"Ft",IDR:"Rp",ILS:"₪",IMP:"\xa3",INR:"₹",IQD:"ع.د",IRR:"﷼",ISK:"kr",JEP:"\xa3",JMD:"J$",JOD:"JD",JPY:"\xa5",KES:"KSh",KGS:"лв",KHR:"៛",KMF:"CF",KPW:"₩",KRW:"₩",KWD:"KD",KYD:"$",KZT:"₸",LAK:"₭",LBP:"\xa3",LKR:"₨",LRD:"$",LSL:"M",LTC:"Ł",LTL:"Lt",LVL:"Ls",LYD:"LD",MAD:"MAD",MDL:"lei",MGA:"Ar",MKD:"ден",MMK:"K",MNT:"₮",MOP:"MOP$",MRO:"UM",MRU:"UM",MUR:"₨",MVR:"Rf",MWK:"MK",MXN:"$",MXV:"MXV",MYR:"RM",MZN:"MT",NAD:"$",NGN:"₦",NIO:"C$",NOK:"kr",NPR:"₨",NZD:"$",OMR:"﷼",PAB:"B/.",PEN:"S/.",PGK:"K",PHP:"₱",PKR:"₨",PLN:"zł",PYG:"Gs",QAR:"﷼",RMB:"￥",RON:"lei",RSD:"Дин.",RUB:"₽",RWF:"R₣",SAR:"﷼",SBD:"$",SCR:"₨",SDG:"ج.س.",SEK:"kr",SGD:"S$",SHP:"\xa3",SLL:"Le",SOS:"S",SRD:"$",SSP:"\xa3",STD:"Db",STN:"Db",SVC:"$",SYP:"\xa3",SZL:"E",THB:"฿",TJS:"SM",TMT:"T",TND:"د.ت",TOP:"T$",TRL:"₤",TRY:"₺",TTD:"TT$",TVD:"$",TWD:"NT$",TZS:"TSh",UAH:"₴",UGX:"USh",USD:"$",UYI:"UYI",UYU:"$U",UYW:"UYW",UZS:"лв",VEF:"Bs",VES:"Bs.S",VND:"₫",VUV:"VT",WST:"WS$",XAF:"FCFA",XBT:"Ƀ",XCD:"$",XOF:"CFA",XPF:"₣",XSU:"Sucre",XUA:"XUA",YER:"﷼",ZAR:"R",ZMW:"ZK",ZWD:"Z$",ZWL:"$"};
function getSymbolFromCurrency(t){if("string"!=typeof t)return;let e=t.toUpperCase();if(Object.prototype.hasOwnProperty.call(currencySymbolMap,e))return currencySymbolMap[e]};

/*
 * If script is run within the app, then prompt user for amount to be converted.
 * As we can't send this to the widget itself, we write it to a settings file to
 * be able to retrieve it when the widget is refreshed TBD
 */
if(config.runsInApp) {
	var amountInput = new Alert()
	amountInput.addAction("Calculate")
	amountInput.title = "Enter amount:"
	let txtField = amountInput.addTextField(params.foreignCurrency)
	txtField.setDecimalPadKeyboard()
	let title = await amountInput.presentAlert()

	let amount = amountInput.textFieldValue(0)

	if(!isNaN(amount)) {
		const jsonData = { "amount": amount };
		try {
			jsonFileManager.write(Script.name() + "-amount.json", jsonData);
		} catch (err) {
			console.log(err);
		}		
	}
}


/*
 * Get flag images for foreign currency and my currency
 *
 */
url = "https://wise.com/public-resources/assets/flags/rectangle/" + params.myCurrency.toLowerCase() + ".png"
myCountryFlag = await loadImage(url)
url = "https://wise.com/public-resources/assets/flags/rectangle/" + params.foreignCurrency.toLowerCase() + ".png"
foreignCountryFlag = await loadImage(url)


/*
 * Create the ListWidget container for the stacks
 */
const w = new ListWidget()

// The gradient background for the widget
const hex = ["#000000","#1a1919","#4c484a","#272626","#000000"]
let gradient = new LinearGradient()
gradient.colors = [new Color(hex[0]),new Color(hex[1]),new Color(hex[2]),new Color(hex[4]),new Color(hex[4])]
gradient.locations = [0,0.1,0.5,0.9,1]
gradient.startPoint = new Point(0,0)
gradient.endPoint = new Point(1,1)
w.backgroundGradient=gradient

outerStack = w.addStack()
outerStack.layoutVertically()
outerStack.setPadding(5,50,5,50)

// Header (country name)
innerStack = outerStack.addStack()
txt = innerStack.addText(params.country)
txt.font = Font.largeTitle()
txt.textColor = color.white;
outerStack.addSpacer(15)

innerStack = outerStack.addStack()
innerStack.layoutHorizontally()

s = innerStack.addStack()
s.size = new Size(33,22)
s.bottomAlignContent()
imgw = s.addImage(foreignCountryFlag)
imgw.imageSize=new Size(33, 22)
imgw.cornerRadius = 4

/*
 * Print the foreign currency values that are to be converted
 */
for(i in params.moneyValues) {
	innerStack.addSpacer(2)
	s = innerStack.addStack()
	s.backgroundColor = new Color("#ffffff", 0.3)
	s.cornerRadius = 4
	s.size = new Size(32,22)
	s.centerAlignContent()
	s.setPadding(0,2,0,2)
	txt = s.addText(params.moneyValues[i].toString())
	txt.rightAlignText()
	txt.lineLimit = 1
	txt.minimumScaleFactor = 0.1
	txt.textColor = color.white;
}

outerStack.addSpacer(5)
innerStack = outerStack.addStack()
innerStack.layoutHorizontally()

s = innerStack.addStack()
s.size = new Size(33,22)
s.bottomAlignContent()
imgw = s.addImage(myCountryFlag)
imgw.imageSize=new Size(33, 22)
imgw.cornerRadius = 4

/*
 * Print the converted values in myCurrency
 */
for(i in params.moneyValues) {
	innerStack.addSpacer(2)
	s = innerStack.addStack()
	s.backgroundColor = new Color("#ffffff", 0.3)
	s.cornerRadius = 4
	s.size = new Size(32,22)
	s.centerAlignContent()
	s.setPadding(0,2,0,2)
	amount = resp.data[params.myCurrency]*params.moneyValues[i]
	if(amount > 10) {
		amount = amount.toFixed(0)
	}
	else {
		amount = amount.toFixed(1)
	}
	txt = s.addText(amount)
	txt.rightAlignText()
	txt.lineLimit = 1
	txt.minimumScaleFactor = 0.1
	txt.textColor = color.white;
}





/*
 * Get the amount that may have been stored previously when running in app mode,
 * and show the converted amount in the widget.
 */
let storedAmount;
//if(config.runsInWidget()) {
if(true) {
	try {
		storedAmount = jsonFileManager.read(Script.name() + "-amount.json");
	} catch (err) {
		console.log(err);
	}
		
	if(storedAmount.amount && !isNaN(storedAmount.amount)) {
		outerStack.addSpacer(10)
		innerStack = outerStack.addStack()
		innerStack.size = new Size(305,22)
		
		innerStack.addSpacer()

		txt = innerStack.addText(getSymbolFromCurrency(params.foreignCurrency) + " " + storedAmount.amount)
		txt.textColor = color.white;

		innerStack.addSpacer()
		
		imgw = innerStack.addImage(foreignCountryFlag)
		imgw.imageSize=new Size(33, 22)
		imgw.cornerRadius = 4
		
		innerStack.addSpacer()

		imgw = innerStack.addImage(myCountryFlag)
		imgw.imageSize=new Size(33, 22)
		imgw.cornerRadius = 4
		
		innerStack.addSpacer()
		
		let localAmount = storedAmount.amount*resp.data[params.myCurrency];
		if(localAmount > 10) {
			localAmount = localAmount.toFixed(0)
		}
		else {
			localAmount = localAmount.toFixed(1)
		}

		txt = innerStack.addText(getSymbolFromCurrency(params.myCurrency) + " " + localAmount)
		txt.textColor = color.white;
		
		innerStack.addSpacer()
	}
}

Script.setWidget(w)
Script.complete()
w.presentMedium()
App.close()