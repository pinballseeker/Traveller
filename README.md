# traveller
A traveller's widget that helps you figure out what things really cost (in your own currency).

![traveller-widget](https://github.com/pinballseeker/scriptable-widgets-traveller/assets/72741095/25feea2c-1b65-4529-ab4d-89503e9a4f42)

The widget displays the amounts set in the configuration in the foreign currency, along with the calculated amount in your own currency.

You can also tap on the widget to bring up an alert asking you to enter an amount. That amount, along with the calculated equivalent in your own currency is then displayed in the lower part of the widget.

## Installation

Download Traveller.js and place it in the "Scriptable" directory in your iCloud Drive (or copy the source code into a new Scriptable script).

You will need a FREE API key from https://freecurrencyapi.com, just sign up and get your key.

## Configuration

You can configure the widget in a number of ways:
- By editing the configuration at the top of the Traveller.js file.
- By creating a settings file names Traveller.json in the Scriptables directory.
- By including the JSON configuration in the widget's settings.

Here are the possible settings:

    const scriptParams = {
    	currencyApiKey: 'YOUR_API_KEY_HERE',
    	foreignCurrency: 'ISK',
    	myCurrency: 'EUR',
    	country: 'Iceland',
    	moneyValues: [100,250,500,750,1000,2500,5000,10000]
    }

And here's what each setting is for:
- currencyApiKey: as previously explained, get your free API key from https://freecurrencyapi.com
- foreignCurrency: the currency of the country you are visiting
- myCurrency: your own currency that you know and understand
- country: the country you are visiting (basically just for the widget heading)
- moneyValues: 8 values in the foreign currency that will be shown and converted

That's basically it. Hopefully this will help you getting ripped off the next time you're on the road!
