# Introduction #

This project site hosts various clients (browser extensions, plugins, etc.) for the free AutoSMS web-based text messaging service. Seeing as how some Google Chrome extensions have their source hosted on Google code, thought I should do similarly. The source files here can serve as useful examples of how to port an application/gadget/widget across different browser/client platforms.

For more details on AutoSMS service, see the service website at http://www.watacrackaz.com/autosms.

That service also offers a Firefox extension ~~and Facebook app~~, so I only built for the other remaining browsers who have been left out along with a few other platforms. The service also has an Android app at http://www.textr.us/anonytext.

# Support for the AutoSMS client extensions #

You can inquire about issues with these clients via this site's issue tracking system, or post to the wiki page, [DiscussionForumAndFAQ](DiscussionForumAndFAQ.md). NOTE that you will need either a Google or GMail account to post an issue or comment. And please bear in mind that some issues relate to the service rather than the client functionality and hence should be directed to the service provider rather than the client developer.

Client issues include things like when install/uninstall of the extension doesn't work on browser, Chrome extension works but Safari extension doesn't, etc. Service issues include things like can't send SMS, get problematic response messages from service, no drop down list of cell/mobile carriers.

You can try the service provider support via their [website](http://www.watacrackaz.com/autosms) (not too helpful) or related [Google Group](http://groups.google.com/group/anonytext).

**NOTE:** lately, there seems to be issue with Safari Extension in that it intermittently works. When it fails, the error message just keeps saying to enter the CAPTCHA code, noted as [issue 2](http://code.google.com/p/autosmsclients/issues/detail?id=2).

# Downloads #

  * [Google Chrome Extension](https://chrome.google.com/extensions/detail/ldchbhmddhdbdbhlmhhbbmimlaakplol)
  * [Opera 15+/Next extension](https://addons.opera.com/en/extensions/details/autosms/?display=en)
  * [Windows Phone 8.1 app](http://www.windowsphone.com/en-us/store/app/autosms-client/036c352d-99ff-4fba-9aae-8886b6177a2f)
  * [Windows 8/8.1 store app](http://apps.microsoft.com/windows/app/autosms-client/0c89f13a-c1b0-4095-ae05-952c9ebb0987)
  * [Microsoft HTA application client](http://autosmsclients.googlecode.com/files/autosmshta.zip) (requires IE 7+)
  * [Opera 10 Widget](http://autosmsclients.googlecode.com/files/autosms.wgt) (download with Opera to install. This is for Opera 10 and earlier)
  * [Safari Extension](http://autosmsclients.googlecode.com/files/autosms.safariextz) (download with Safari to install), **NOTE:** lately, there seems to be issue with Safari Extension in that it intermittently works. When it fails, the error message just keeps saying to enter the CAPTCHA code, noted as [issue 2](http://code.google.com/p/autosmsclients/issues/detail?id=2).
  * [Windows 7/Vista Gadget](http://autosmsclients.googlecode.com/files/autosms.gadget)
  * [Mac OS X Dashboard widget](http://code.google.com/p/autosmsclients/downloads/detail?name=autosms.wdgt.zip) - proof of concept only, doens't really work.

**NOTE:** If you have problems installing the Windows 7/Vista gadget, you can rename the file from autosms.gadget to autosms.zip then be sure extracted folder is named autosms.gadget and finally copy folder to %UserProfile%\AppData\Local\Microsoft\Windows Sidebar\Gadgets, where %UserProfile% is usually C:\Users\YourUsername. You may have to set folder options to show hidden and system files to find this folder location. Once copied, the gadget should show up in the gadgets list to add/install.

## Screenshots ##

  * [Chrome version](https://chrome.google.com/extensions/detail/ldchbhmddhdbdbhlmhhbbmimlaakplol)
  * [Opera 15/Next version](https://addons.opera.com/en/extensions/details/autosms/?display=en)
  * [Opera 10 version](http://dlweb.s3.amazonaws.com/software/plugins/opera/autosms_opera_screenshot.png)
  * [Windows Phone 8.1 version](http://www.windowsphone.com/en-us/store/app/autosms-client/036c352d-99ff-4fba-9aae-8886b6177a2f)
  * [Window 8/8.1 store app version](http://apps.microsoft.com/windows/app/autosms-client/0c89f13a-c1b0-4095-ae05-952c9ebb0987)
  * [Safari version](http://dlweb.s3.amazonaws.com/software/plugins/safari/autosms-safari_screenshot2.png)
  * [Windows 7/Vista version](http://dlweb.s3.amazonaws.com/software/plugins/win7vista/autosmswingadget.png)
  * HTA app version - same as Opera in look & feel.
  * Mac OS X Dashboard widget - same as Opera in look & feel.

## Updates & notes ##

  * Opera 15/Next extension submitted for approval. It's basically the same as the Chrome version. While waiting for approval, you can get it off the Chrome Web Store, or download an archived older Chrome version off this site's download section.
  * Listed on [Safari Extensions Gallery](http://extensions.apple.com/#productivity) under Productivity Tools section.
  * Opera 10 (and earlier) widget was submitted to Opera widget gallery but never approved (in time), considered obsolete now (for extensions of later versions). No Opera 11/12 extension was ever developed.
  * Windows 7/Vista Gadget was submitted to Windows Live Gallery as a SideShow gadget but never approved (in time), considered obsolete now (replaced by Windows Store for Windows 8). For now, you'll have to download from here.

# Web based version #

See [MobileFriendlyWebClient](MobileFriendlyWebClient.md)

# For Developers #

The source files here can serve as useful examples of how to port an application/gadget/widget across different browser/client platforms.

I've only posted source files and their binary installers so far, you still have to read up on the documentation for each platform on how to develop for them. I may post references to the docs here in the future.

# Suggestions? AutoSMS clients for other platforms #

Any ideas for other AutoSMS clients (platforms) beside what is currently available?

I did have in mind (for me or someone else) to do the following some time eventually:

  * iPhone app (native or PhoneGap)
  * Windows Phone 7, 8 app
  * HTML5 app/version?
  * J2ME mobile Java app
  * Pure Flash or Adobe AIR based client - as an embeddable SWF + compiled Windows and Mac binaries (we do already have version where Flash is used simply in place of XmlHttpRequest, see iGoogle gadget version).
  * Yahoo widget? Or some other web widget/gadget?
  * Server-side based web form for sending SMS (use HTTP request from server side via ASP.NET, Java, PHP, Python, Ruby, Perl, ASP, etc. rather than AJAX).
  * Java applet
  * Java desktop app

# Contact #

You can contact project owner at his Gmail address (same username), or use the issue tracker feature of this site.