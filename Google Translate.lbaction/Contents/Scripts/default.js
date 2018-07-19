// LaunchBar Action Script

function run() {
  LaunchBar.openURL('https://translate.google.cn')
}

function runWithString(argument) {
  var url = 'https://translate.google.cn/#auto/zh-CN/'
  if (LaunchBar.options.commandKey) {
    url = 'https://translate.google.cn/#auto/en/'
  }

  LaunchBar.openURL(url + encodeURIComponent(argument));
}