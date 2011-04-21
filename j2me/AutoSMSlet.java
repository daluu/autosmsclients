import javax.microedition.lcdui.*;
import javax.microedition.midlet.MIDlet;

public class AutoSMSlet
    extends MIDlet
    implements CommandListener {

    //GLOBAL VARIABLES *********************************************************
    //**************************************************************************
    // Place all global variables here. If you need to edit form fields or other
    // GUI items, you may have to declare & initialize them here to be able to
    // access them in the class functions.

    ///Display screen/page declarations
    private Display display;	//Midlet display - REQUIRED, DO NOT DELETE
    
    //Menu command declarations (at the bottom of the screen of emulator)
    //EXIT command should always exist in the main/1st screen
    private final static Command CMD_EXIT =
	    new Command("Exit", Command.EXIT, 2);
    //BACK command should always appear in all but the main/1st screen
    private final static Command CMD_BACK =
	    new Command("Back", Command.BACK, 1);
    //NEXT command to go to next screen
    private final static Command CMD_NEXT =
	    new Command("Next", Command.SCREEN, 1);
    //SEND command for the last screen
    private final static Command CMD_SEND =
	    new Command("Send", Command.OK, 1);
    //HOME command to start over
    private final static Command CMD_HOME =
	    new Command("OK", Command.CANCEL, 1);
	    
    //Screen/Page item/component declarations
    private Image logo, captchaImg;
    private Form mainFrm, msgFrm, captchaFrm;
    private List carriers;
    private TextField toNum, captchaTxt;
    private TextBox msg;
    private StringItem selectedCarrier, msgSuccess, msgErr;
    private String carrier = "";
    private String theNum = "";
    private String theMsg = "";
    private String theCaptcha = "";
    //flag to indicate whether need reload/rebuild list of carriers, involving
    //HTTP request
    private boolean firstLoad = true;
    
    //**************************************************************************

    //MAIN FUNCTION ********************************************************************
    //Signals the MIDlet to start and enter the Active state.
    protected void startApp() {

        display = Display.getDisplay(this);	//initialize LCD display

	//code here
	
	//initialize all GUI components at startup
	
	//startup screen, screen 1
	try {
		image1 = Image.createImage("/AutoSMSlet.png");
	} catch (IOException e) {
                //System.out.println("IOException" + e);
                //System.out.println("Fail to load image!");
       	       //e.printStackTrace();
	       GUIdebug(e,20);
        }
	mainFrm = new Form("main");
	mainFrm.append(logo);
	mainFrm.addCommand(CMD_EXIT);
	mainFrm.addCommand(CMD_NEXT);
	mainFrm.setCommandListener(this);
	
	//carrier selection screen, screen 2
	carriers = new List ("Select Recipient's Carrier:", Choice.IMPLICIT);
	//for each item, create carrier list as follows
        carriers.append("a carrier", null);
	carriers.append("a carrier 2", null);
	//now loaded for first time, no need reload/rebuild list
	firstLoad = false; 
	carriers.addCommand(CMD_EXIT);
	carriers.addCommand(CMD_NEXT);
	carriers.addCommand(CMD_HOME);
	carriers.setCommandListener(this);
	
	//message screen to write SMS, screen 3
	msgFrm = new Form("msging");
	toNum = new TextField("To #:", "", 15, TextField.NUMERIC);
	msg = new TextBox("Message (120 char max)", "", 120, TextField.ANY);
	
	//build these on demand
	selectedCarrier = new StringItem("Selected Carrier: ", carrier);
	msgFrm.append(selectedCarrier);
	msgFrm.append(toNum);
	msgFrm.append(msg);
	msgFrm.addCommand(CMD_EXIT);
	msgFrm.addCommand(CMD_BACK);
	msgFrm.addCommand(CMD_NEXT);
	msgFrm.setCommandListener(this);
	
	//captcha screen, screen 4
	captchaFrm = new Form("captcha");
	captchaTxt = new TextField("Enter CAPTCHA Confirmation Code:", "", 5, TextField.NUMERIC);
	
	//build these on demand
	captchaFrm.append(captchaImg);
	captchaFrm.append(captchaTxt);
	captchaFrm.addCommand(CMD_EXIT);
	captchaFrm.addCommand(CMD_BACK);
	captchaFrm.addCommand(CMD_SEND);
	captchaFrm.setCommandListener(this);
	
	//success screen, screen 5
	msgSuccess = new StringItem("Status: ","Message sent successfully! Sender address will be anonymous (or e.g. do-not-reply@textr.us), with reference of (AutoSMS)");
	msgSuccess.addCommand(CMD_EXIT);
	msgSuccess.addCommand(CMD_HOME);
	msgSuccess.setCommandListener(this);
	
	//failure screen, also screen 5
	msgErr = new StringItem("Status: ","some err msg here");
	msgErr.addCommand(CMD_EXIT);
	msgErr.addCommand(CMD_BACK);
	msgErr.setCommandListener(this);
	//should take user back to screen where can fix problem
	//e.g. captcha screen OR msg screen for wrong phone #
	
    }

    //Event handler function for menu commands  *****************************************
    public void commandAction(Command c, Displayable d) {
	
        if(c == CMD_BACK){
		//code here
		
	}else{ //c == CMD_EXIT
            destroyApp(false);
            notifyDestroyed();
	}
    }

    //Cleanup functions *****************************************************************
    //Signals the MIDlet to terminate and enter the Destroyed state.
    protected void destroyApp(boolean unconditional) {
    }

    //Signals the MIDlet to stop and enter the Paused state.
    protected void pauseApp() {
    }
    //***********************************************************************************
    
    //EXTRA: Debug function *************************************************************
    //Pass in the error message & length of time to show error (in seconds)
    public void GUIdebug(String errmsg, int duration){
	Alert err = new Alert("Error Message:",errmsg,null,null);
	err.setTimeout(duration*1000);
	display.setCurrent(err);
    }
    
    //app startup
    public void startupTmp(){
    }
}