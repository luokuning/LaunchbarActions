// LaunchBar Action Script

function run() {
    LaunchBar.openURL('https://translate.google.com')
}

function runWithString(argument)
{
    var url = 'https://translate.google.com/#auto/zh-CN/'
    if (LaunchBar.options.commandKey) {
      url = 'https://translate.google.com/#auto/en/'
    }

    LaunchBar.openURL(url + encodeURIComponent(argument));
}