import {someOtherFile} from 'lib/some_other_file'

browser.runtime.onInstalled.addListener(() => {
    console.log("chrome.runtime.onInstalled");
});

someOtherFile();
