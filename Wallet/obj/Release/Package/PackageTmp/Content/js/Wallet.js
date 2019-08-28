String.prototype.replaceAll = function (oldStr, newStr) {
    let v = this;
    while (v.indexOf(oldStr) > -1) v = v.replace(oldStr, newStr);
    return v;
};

var Url = "169.50.169.11";
var Port = "8081";
var Monitor = "r3";
var Public, Private;

window.onload = function () {
    index();
    this.document.getElementById("Net").onchange();
};

function SetUrl(el) {
    Url = el.options[el.selectedIndex].value;
    Monitor = el.options[el.selectedIndex].attributes["mon"].value;

    if (el.options[el.selectedIndex].value === "Update") {

        document.getElementById("Work").innerText = "";
        let h2 = document.createElement("h2");
        h2.style = "margin:200px auto; width: 300px; text-align: center;";
        h2.innerText = "Network update";
        document.getElementById("Work").appendChild(h2);
        return;
    }

    if (document.getElementById("Work").children[0].innerText === "Network update") {
        document.getElementById("Work").innerText = "";
        index();
        return;
    }

    el = document.getElementById("MonitorHistory");
    if (el !== null && Public !== undefined) {
        el.attributes["href"].value = "https://monitor.credits.com/" + Monitor + "/account/" + Base58.encode(Public);
    }
    UpdateBalance();
}

function index() {
    let Text = Resourse();

    let Background = document.createElement("div");
    Background.className = "bg-block text-center";

    let Count = document.createElement("div");
    Count.className = "content_main centered_column";
    Background.appendChild(Count);

    let h2 = document.createElement("h2");
    h2.className = "main";
    h2.innerText = Text.index_title;
    Count.appendChild(h2);

    let div = document.createElement("div");
    div.className = "mb-50";

    let p = document.createElement("p");
    p.className = "main";
    p.innerText = Text.index_Desc_1;
    div.appendChild(p);

    p = document.createElement("p");
    p.className = "main";
    p.innerText = Text.index_Desc_2;
    div.appendChild(p);

    Count.appendChild(div);

    div = document.createElement("div");
    div.className = "row w-650 around align-bottom mobile-center top_block";

    Count.appendChild(div);

    let div2 = document.createElement("div");
    div.appendChild(div2);

    let div3 = document.createElement("div");
    div3.className = "margin_top_20";
    div2.appendChild(div3);

    let a = document.createElement("a");
    a.className = "bold-link bttn2 whiter-c";
    a.onclick = RenderKey;
    a.innerText = Text.index_button_1;
    div3.appendChild(a);

    div2 = document.createElement("div");
    div.appendChild(div2);

    div3 = document.createElement("div");
    div3.className = "margin_top_20";
    div2.appendChild(div3);

    a = document.createElement("a");
    a.className = "bold-link bttn whiter-w";
    a.onclick = SignIn;
    a.innerText = Text.index_button_2;
    div3.appendChild(a);

    document.getElementById("Work").appendChild(Background);

    Background = document.createElement("div");
    Background.className = "content_main pb-20";

    h2 = document.createElement("h2");
    h2.className = "title text-center";
    h2.innerText = Text.index_h2_2;
    Background.appendChild(h2);

    div = document.createElement("div");
    div.className = "row around  mobile-column mobile-center";

    div2 = document.createElement("div");
    div2.className = "feature";
    div.appendChild(div2);

    let img = document.createElement("img");
    img.className = "feature__img";
    img.src = "../../Content/image/index/main-01-01.svg";
    div2.appendChild(img);

    div3 = document.createElement("div");
    div3.className = "feature__title";
    div3.innerText = Text.index_Desc_3;
    div2.appendChild(div3);


    div2 = document.createElement("div");
    div2.className = "feature";
    div.appendChild(div2);

    img = document.createElement("img");
    img.className = "feature__img";
    img.src = "../../Content/image/index/main-02-01.svg";
    div2.appendChild(img);

    div3 = document.createElement("div");
    div3.className = "feature__title";
    div3.innerText = Text.index_Desc_4;
    div2.appendChild(div3);


    div2 = document.createElement("div");
    div2.className = "feature";
    div.appendChild(div2);

    img = document.createElement("img");
    img.className = "feature__img";
    img.src = "../../Content/image/index/main-02-01.svg";
    div2.appendChild(img);

    div3 = document.createElement("div");
    div3.className = "feature__title";
    div3.innerText = Text.index_Desc_5;
    div2.appendChild(div3);


    div2 = document.createElement("div");
    div2.className = "feature";
    div.appendChild(div2);

    img = document.createElement("img");
    img.className = "feature__img";
    img.src = "../../Content/image/index/main-03-01.svg";
    div2.appendChild(img);

    div3 = document.createElement("div");
    div3.className = "feature__title";
    div3.innerText = Text.index_Desc_6;
    div2.appendChild(div3);

    Background.appendChild(div);

    document.getElementById("Work").appendChild(Background);

    Background = document.createElement("div");
    Background.className = "bg-grey pt-40 pb-40";
    Background.style = "margin-bottom: -200px;";

    div = document.createElement("div");
    div.className = "content_main";
    Background.appendChild(div);

    h2 = document.createElement("h2");
    h2.className = "title text-center mb-20";
    h2.innerText = Text.index_h2_3;
    div.appendChild(h2);

    div2 = document.createElement("div");
    div2.className = "mx-auto";
    div.appendChild(div2);

    p = document.createElement("p");
    p.className = "main pb-20";
    p.innerText = Text.index_Desc_7;
    div2.appendChild(p);

    p = document.createElement("p");
    p.className = "main pb-20";
    p.innerText = Text.index_Desc_8;
    div2.appendChild(p);

    document.getElementById("Work").appendChild(Background);
}

function RenderKey() {
    let Text = Resourse();

    document.getElementById("Work").innerHTML = "";

    let Cont = document.createElement("div");
    Cont.className = "row content content-inner";

    let div = document.createElement("div");
    div.className = "left-bar";
    Cont.appendChild(div);

    div.appendChild(Faq());

    div = document.createElement("div");
    div.className = "w-content";
    Cont.appendChild(div);

    document.getElementById("Work").appendChild(Cont);

    PopapRegister();
}

function Loader()
{
    let Cont = document.getElementById("loader-container");
    if (Cont === null)
    { 
        let Loader = document.createElement("div");
        Loader.className = "loader-layer";
        Loader.id = "loader-container";

        let Wraper = document.createElement("div");
        Wraper.className = "loader-wrap";
        Loader.appendChild(Wraper);

        let Inner = document.createElement("div");
        Inner.className = "loader-inner";
        Wraper.appendChild(Inner);

        let Label = document.createElement("div");
        Label.className = "loader-label";
        Label.innerText = "Loading...";
        Inner.appendChild(Label);

        let Animate = document.createElement("div");
        Animate.id = "loader-animate";
        Inner.appendChild(Animate);

        document.getElementsByTagName("body")[0].appendChild(Loader);
    }
}

function CloseLoader()
{
    let Cont = document.getElementById("loader-container");
    if (Cont !== null)
    {
        Cont.remove();
    }
}


function VisiblePassword() {
    document.getElementById("Password").type = "text";
    document.getElementsByClassName("PasswordField_Img1")[0].classList.add("displayNone");
    document.getElementsByClassName("PasswordField_Img2")[0].classList.remove("displayNone");
}

function InVisiblePassword() {
    document.getElementById("Password").type = "Password";
    document.getElementsByClassName("PasswordField_Img2")[0].classList.add("displayNone");
    document.getElementsByClassName("PasswordField_Img1")[0].classList.remove("displayNone");
}

function NewKey() {
    document.getElementsByClassName("popup-bg")[0].remove();

    let Text = Resourse();

    let signPair = nacl.sign.keyPair();
    let PublicKey = Base58.encode(signPair.publicKey);
    let PrivateKey = Base58.encode(signPair.secretKey);

    var str = {
        key: {
            public: PublicKey,
            private: PrivateKey
        }
    };

    DownloadFile("key.json", JSON.stringify(str));

    document.getElementsByClassName("w-content")[0].innerHTML = "";

    let div = document.createElement("div");
    div.id = "FormaPassword";

    let h1 = document.createElement("h1");
    h1.className = "title";
    h1.innerText = Text.NewKey_h1_1;
    div.appendChild(h1);

    let p = document.createElement("p");
    p.innerText = Text.NewKey_p_1;
    div.appendChild(p);

    let h2 = document.createElement("h2");
    h2.innerText = Text.NewKey_h2_1;
    div.appendChild(h2);

    let label = document.createElement("p");
    label.innerText = Text.NewKey_label_1;
    div.appendChild(label);

    let input = document.createElement("input");
    input.className = "main-input";
    input.id = "Public";
    input.value = PublicKey;
    div.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed";
    p.id = "ErrorPub";
    div.appendChild(p);

    label = document.createElement("p");
    label.innerText = Text.NewKey_label_2;
    div.appendChild(label);

    input = document.createElement("input");
    input.className = "main-input";
    input.id = "Private";
    input.value = PrivateKey;
    div.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed";
    p.id = "ErrorPriv";
    div.appendChild(p);

    p = document.createElement("p");
    p.innerText = Text.NewKey_inportant;
    p.className = "textColorRed"; 
    div.appendChild(p);

    let div2 = document.createElement("p");
    div2.className = "fontBold";
    div.appendChild(div2);

    let button = document.createElement("a");
    button.className = "bold-link bttn margin_top_20";
    button.innerText = Text.NewKey_button_1;
    button.onclick = OpenAcc;
    div2.appendChild(button);

    document.getElementsByClassName("w-content")[0].appendChild(div);
}

function SignIn(CallEv) {
    let Text = Resourse();

    document.getElementById("Work").innerHTML = "";

    let Cont = document.createElement("div");
    Cont.className = "row content content-inner";

    let div = document.createElement("div");
    div.className = "left-bar";
    Cont.appendChild(div);

    div.appendChild(Faq());

    div = document.createElement("div");
    div.className = "w-content";
    Cont.appendChild(div);

    let div2 = document.createElement("div");
    div2.id = "FormaPassword";
    div.appendChild(div2);

    let h1 = document.createElement("h1");
    switch (CallEv) {
        case "Token":
            h1.innerText = Text.SignIn_h1_1_InTock;
        break;
        case "Smart":
            h1.innerText = Text.SignIn_h1_1_InSmart;
        break;
        default:
            h1.innerText = Text.SignIn_h1_1;
    }
    div2.appendChild(h1);

    let p = document.createElement("p");
    p.innerText = Text.SignIn_p_1;
    div2.appendChild(p);

    let h2 = document.createElement("h2");
    h2.innerText = Text.SignIn_h2_1;
    div2.appendChild(h2);

    p = document.createElement("p");
    p.innerText = Text.SignIn_p_2;
    div2.appendChild(p);

    let label = document.createElement("p");
    label.innerText = Text.SignIn_label_1;
    div2.appendChild(label);

    let input = document.createElement("input");
    input.className = "main-input";
    input.id = "Public";
    input.placeholder = Text.SignIn_input_placeholder_1;
    div2.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed";
    p.id = "ErrorPub";
    div2.appendChild(p);

    label = document.createElement("p");
    label.innerText = Text.SignIn_label_2;
    div2.appendChild(label);

    input = document.createElement("input");
    input.className = "main-input";
    input.id = "Private";
    input.placeholder = Text.SignIn_input_placeholder_2;
    div2.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed";
    p.id = "ErrorPriv";
    div2.appendChild(p);

    let div3 = document.createElement("p");
    div3.className = "fontBold";
    div2.appendChild(div3);

    let button = document.createElement("a");
    button.className = "bold-link bttn margin_top_20";
    button.innerText = Text.SignIn_button_1;
    button.id = "OpenAcc";
    button.onclick = OpenAcc.bind(this, CallEv);
    div3.appendChild(button);

    h2 = document.createElement("h2");
    h2.innerText = Text.SignIn_h2_2;
    div2.appendChild(h2);

    div3 = document.createElement("p");
    div3.className = "fontBold";
    div2.appendChild(div3);

    button = document.createElement("a");
    button.className = "bold-link bttn margin_top_20";
    button.innerText = Text.SignIn_button_2;
    button.onclick = InputFile;
    div3.appendChild(button);

    p = document.createElement("p");
    p.id = "ErrorFileKey";
    p.className = "textColorRed";
    div2.appendChild(p);

    let El = document.createElement("input");
    El.style = "display:none;";
    El.id = "KeyFile";
    El.type = "file";
    El.onchange = ReadFile;
    div2.appendChild(El);

    document.getElementById("Work").appendChild(Cont);
}

function OpenAcc(CallEv, el) {
    let TopMenuRegister = document.getElementById("TopMenuRegister");
    if (TopMenuRegister !== undefined)
    {
        TopMenuRegister.remove();
    }
    let TopMenuLogin = document.getElementById("TopMenuLogin");
    if (TopMenuLogin !== undefined) {
        TopMenuLogin.remove();
    }
    let TopMenuLogout = document.getElementById("TopMenuLogout");
    if (TopMenuLogout !== undefined) {
        TopMenuLogout.removeAttribute("style");
    }
    

    let ErrorPub = document.getElementById("ErrorPub");
    let ErrorPriv = document.getElementById("ErrorPriv");

    ErrorPub.innerText = "";
    ErrorPriv.innerText = "";

    Public = document.getElementById("Public").value;
    Private = document.getElementById("Private").value;

    let Text = Resourse();

    if (Public === "") {
        ErrorPub.innerText = Text.SignIn_input_error_1;
        return;
    }
    if (Private === "") {
        ErrorPriv.innerText = Text.SignIn_input_error_2;
        return;
    }

    Public = Base58.decode(Public);
    Private = Base58.decode(Private);

    document.getElementById("Work").innerHTML = `<div class="row content content-inner">
    <div class="left-bar">
        <div class="account_field mb-50">
            <div class="hiddenly-ac hidden-acc">
                <div class="left-bar-title">
                    <div class="font_w_600">${Text.Acc_Desc_1}</div><a><img src="../Content/image/icon/copy.png" id="CopyWalletKeyButton" alt=""></a><!--<a><img src="../Content/image/icon/Qr.png" alt=""></a>-->
                </div>
                <div class="breaked mb-25" id="WalletKey">${Base58.encode(Public)}</div >
                <div class="left-bar-title">
                    <div class="font_w_600">${Text.Acc_Desc_2}</div>
                    <a class="d-flex-center"><img id="UpdateBalanceButton" src="../Content/image/icon/Reload.png" alt=""></a>
                </div>
                <div class="breaked" id="Balance">
                    <table class="balance_table">
                    </table>
                </div>
                <div class="slide-popup mb-25" id="CoinMarketCap"></div>
                <div class="font_w_600">Token:</div>
                <div class="breaked" id="BalanceToken"><table class="balance_table"></table></div>
                <div class="button-balanceToken" id="ShowTokenListButton"><div class="arrow-top"></div></div>
                <div class="breaked mb-20"></div>
                <div><a class="link" href="https://monitor.credits.com/${Monitor}/account/${Base58.encode(Public)}" target="_blank" id="MonitorHistory"><img src="../Content/image/icon/monitorDertailed.png" alt="">Detailed transaction history</a></div>
                <div><a id="PerformTransactionButton" class="link"><img src="../Content/image/icon/PerformTransaction.png" alt="">Perform a transaction</a></div>
                <div><a id="SmartContractButton" class="link"><img  src="../Content/image/icon/SmarContract.png" alt="">Smart contracts</a></div>
                <div><a id="CreateSmartButton" class="link"><img src="../Content/image/icon/CreateSmart.png" alt="">Create smart contract</a></div>
                <div><a id="CreateTokenButton" class="link"><img src="../Content/image/icon/CreateToken.png" alt="">Create a token</a></div>
            </div>
        </div>
    </div>
    <div class="w-content"></div>
</div>`;
    document.getElementById("CopyWalletKeyButton").onclick = CopyWalletKey;
    document.getElementById("UpdateBalanceButton").onclick = UpdateBalance;
    document.getElementById("ShowTokenListButton").onclick = ShowToken.bind(this);
    document.getElementsByClassName("left-bar")[0].appendChild(Faq());
    document.getElementById("PerformTransactionButton").onclick = RanderPayment;
    document.getElementById("SmartContractButton").onclick = RenderExecuterSmartContract;
    document.getElementById("CreateSmartButton").onclick = RenderCreateSmartContract;
    document.getElementById("CreateTokenButton").onclick = RenderCreateToken;

    switch (CallEv) {
        case "Token":
            RenderCreateToken();
            break;
        case "Smart":
            RenderExecuterSmartContract();
            break;
        default:
            RanderPayment();
    }
}

function RenderCreateSmartContract()
{
    let el = document.getElementsByClassName("w-content")[0];
    el.innerText = "";

    let Text = Resourse();

    let h2 = document.createElement("h2");
    h2.classList = "title";
    h2.innerText = "Write a smart contract";
    el.appendChild(h2);

    let input = document.createElement("input");
    input.classList = "main-input";
    input.placeholder = "Fee";
    input.id = "Fee";
    el.appendChild(input);

    div = document.createElement("div");
    div.className = "mb-20";
    el.appendChild(div);

    let textarea = document.createElement("div");
    textarea.className = "text_area_fluid";
    textarea.id = "SmartEditor";
    div.appendChild(textarea);

    div = document.createElement("div");
    div.className = "row mb-50";
    el.appendChild(div);

    let button = document.createElement("a");
    button.className = "link fo_link";
    button.innerText = Text.CreateToken_button_1;
    button.onclick = RanderPayment;
    div.appendChild(button);

    button = document.createElement("a");
    button.className = "bold-link bttn margin_left_60";
    button.innerText = Text.CreateToken_button_2;
    button.id = "TokenDeploy";
    button.onclick = DeployToken;
    div.appendChild(button);

    var editor = ace.edit("SmartEditor");
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/java");
    editor.setValue("");
    editor.setOptions({
        wrap: true
    });
}

function ShowToken(ev) {
    let el = document.getElementById("BalanceToken");
    if (el !== undefined) {
        if (el.style.maxHeight === "") {
            el.style.maxHeight = "unset";
        } else {
            el.style.maxHeight = "";
        }
    }
}

function CopyWalletKey() {
    let key = document.querySelector('#WalletKey');
    let range = document.createRange();
    range.selectNode(key);
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
        selection.removeAllRanges();
    }
    selection.addRange(range); 
    console.log(document.execCommand('copy'));
    selection.removeAllRanges();
    OpenMiniInfoPopap();
}

function OpenMiniInfoPopap() {

    let index = 0;
    let elements = document.getElementsByClassName("micropopup");
    if (elements.length > 0) {
        index = Number(elements[elements.length - 1].getAttribute("Ind")) + 1;
    }


    let div = document.createElement("div");
    div.className = "micropopup";
    div.setAttribute("Ind", index);
    document.getElementsByTagName("body")[0].appendChild(div);

    let div2 = document.createElement("div");
    div2.className = "micro-title-row";
    div.appendChild(div2);

    let span = document.createElement("span");
    span.innerText = "X";
    span.onclick = function () { CloseMiniInfoPopap(index); };
    div2.appendChild(span);

    div2 = document.createElement("div");
    div2.className = "micro-text-row";
    div2.innerText = "Key copied to clipboard";
    div.appendChild(div2);

    setTimeout(function () {
        CloseMiniInfoPopap(index);
    }, 2000);
}

function CloseMiniInfoPopap(Ind) {
    let elements = document.getElementsByClassName("micropopup");
    for (let i = 0; i < elements.length; i = i + 1)
    {
        if (Number(elements[i].getAttribute("Ind")) === Ind)
        {
            elements[i].remove();
            break;
        }
    }
}

function RenderCreateToken(Obj)
{
    if (typeof Obj !== "object")
    {
        Obj = {};
    }

    let DefObj = {
        Name: undefined,
        Symbol: undefined,
        Decimal: undefined,
        TotalCoins: undefined
    };

    for (let i in DefObj)
    {
        if (Obj[i] === undefined)
        {
            Obj[i] = DefObj[i];
        }
    }


    let Text = Resourse();

    let el = document.getElementsByClassName("w-content")[0];
    el.innerText = "";

    let h2 = document.createElement("h2");
    h2.className = "title";
    h2.innerText = Text.CreateToken_h2_2;
    el.appendChild(h2);

    let p = document.createElement("div");
    p.className = "mb-20";
    p.innerText = Text.CreateToken_p_2;
    el.appendChild(p);

    p = document.createElement("p");
    p.innerText = "Your token's full name";
    el.appendChild(p);

    let input = document.createElement("input");
    input.className = "main-input";
    input.placeholder = "Name";
    input.id = "SmartName";
    input.value = Obj.Name === undefined ? "" : Obj.Name;
    el.appendChild(input);

    p = document.createElement("p");
    p.id = "SmartNameError";
    el.appendChild(p);

    p = document.createElement("p");
    p.innerText = "Ticker symbol (abbreviated name or label of the token)";
    el.appendChild(p);

    input = document.createElement("input");
    input.className = "main-input";
    input.placeholder = "Symbol";
    input.id = "Symbol";
    input.value = Obj.Symbol === undefined ? "" : Obj.Symbol;
    el.appendChild(input);

    p = document.createElement("p");
    p.id = "SymbolError";
    el.appendChild(p);

    p = document.createElement("p");
    p.innerText = "The number of characters after the dot (not more than 18 digits)";
    el.appendChild(p);

    input = document.createElement("input");
    input.className = "main-input";
    input.placeholder = "Decimal";
    input.id = "Decimal";
    input.value = Obj.Decimal === undefined ? "" : Obj.Decimal;
    el.appendChild(input);

    p = document.createElement("p");
    p.id = "DecimalError";
    el.appendChild(p);

    p = document.createElement("p");
    p.innerText = "Number of tokens (no more than 27 digits)";
    el.appendChild(p);

    input = document.createElement("input");
    input.className = "main-input";
    input.placeholder = "Token cost";
    input.id = "TokenCost";
    input.style = "display:none;";
    el.appendChild(input);

    input = document.createElement("input");
    input.className = "main-input";
    input.placeholder = "Total quantity";
    input.id = "TotalCoins";
    input.oninput = (e) => {
        console.log(e);
        while (e.target.value.search(/[^0-9]/) >= 0)
        {
            e.target.value = e.target.value.replace(/[^0-9]/, '');
        }

        e.target.value = Spliter(e.target.value);
    };
    input.value = Obj.TotalCoins === undefined ? "" : Obj.TotalCoins;
    el.appendChild(input);

    p = document.createElement("p");
    p.id = "TotalCoinsError";
    el.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-50";
    p.innerText = "You can add the functionality of your token to an additional number of parameters not listed here. To do this, you will need to write them in the source code of the smart contract.";
    el.appendChild(p);

    let a = document.createElement("a");
    a.href = "https://developers.credits.com/en/Articles/a_Creating_tokens_smart_contract_on_the_Credits_standard";
    a.innerText = "Read more";
    a.className = "link";
    a.target = "_blank";
    p.appendChild(a);

    let div = document.createElement("div");
    div.className = "row mb-50";
    el.appendChild(div);

    let button = document.createElement("a");
    button.className = "link fo_link";
    button.onclick = RanderPayment;
    button.innerText = Text.CreateToken_button_1;
    div.appendChild(button);

    button = document.createElement("a");
    button.className = "bold-link bttn margin_left_60";
    button.innerText = "Create contract";
    button.onclick = CreateSmartToken;
    div.appendChild(button);
}

function CreateSmartToken() {
    let SmartNameError = document.getElementById("SmartNameError");
    SmartNameError.innerText = "";

    let SymbolError = document.getElementById("SymbolError");
    SymbolError.innerText = "";

    let DecimalError = document.getElementById("DecimalError");
    DecimalError.innerText = "";

    let TotalCoinsError = document.getElementById("TotalCoinsError");
    TotalCoinsError.innerText = "";

    let SmartName   = document.getElementById("SmartName").value;
    let Symbol      = document.getElementById("Symbol").value;
    let Decimal     = document.getElementById("Decimal").value;
    let TokenCost   = document.getElementById("TokenCost").value;
    let TotalCoins  = document.getElementById("TotalCoins").value;

    if (SmartName === "") {
        SmartNameError.innerText = "Name must not be empty";
        return;
    }

    if (Symbol === "") {
        SymbolError.innerText = "Symbol must not be empty";
        return;
    }


    if (Decimal === "") {
        DecimalError.innerText = "Decimal must not be empty";
        return;
    }

    if (TotalCoins === "") {
        TotalCoinsError.innerText = "Total quantity must not be empty";
        return;
    }

    while (TotalCoins.search(/\s/) >= 0) {
        TotalCoins = TotalCoins.replace(/\s/, '');
    }

    let Smart = `import com.credits.scapi.v0.BasicStandard;
import com.credits.scapi.v0.SmartContract;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static java.math.BigDecimal.ROUND_DOWN;
import static java.math.BigDecimal.ZERO;

public class TokenBasicStandard${Symbol} extends SmartContract implements BasicStandard {

    private final String owner;
    private final BigDecimal tokenCost;
    private final int decimal;
    HashMap<String, BigDecimal> balances;
    private String name;
    private String symbol;
    private BigDecimal totalCoins;
    private BigDecimal freeCoins;
    private HashMap<String, Map<String, BigDecimal>> allowed;
    private boolean frozen;

    public TokenBasicStandard${Symbol}() {
        super();
        name = "${SmartName}";
        symbol = "${Symbol}";
        decimal = ${Decimal === `` ? 0 : Decimal};
        tokenCost = new BigDecimal(1).setScale(decimal, ROUND_DOWN);
        totalCoins = new BigDecimal(${TotalCoins === `` ? 0 : TotalCoins}).setScale(decimal, ROUND_DOWN);
        freeCoins = new BigDecimal(${TotalCoins === `` ? 0 : TotalCoins}).setScale(decimal, ROUND_DOWN);
        owner = initiator;
        allowed = new HashMap<>();
        balances = new HashMap<>();
        balances.put(owner, new BigDecimal(${TotalCoins === `` ? 0 : TotalCoins}L).setScale(decimal, ROUND_DOWN));
    }

    @Override
    public int getDecimal() {
        return decimal;
    }

    @Override
    public boolean setFrozen(boolean isFrozen) {
        if (!initiator.equals(owner)) {
            throw new RuntimeException("unable change frozen state! The wallet " + initiator + " is not owner");
        }
        this.frozen = isFrozen;
        return true;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getSymbol() {
        return symbol;
    }

    @Override
    public String totalSupply() {
        return totalCoins.toString();
    }

    @Override
    public String balanceOf(String owner) {
        return getTokensBalance(owner).toString();
    }

    @Override
    public String allowance(String owner, String spender) {
        if (allowed.get(owner) == null) {
            return "0";
        }
        BigDecimal amount = allowed.get(owner).get(spender);
        return amount != null ? amount.toString() : "0";
    }

    @Override
    public boolean transfer(String to, String amount) {
        contractIsNotFrozen();
        if (!to.equals(initiator)) {
            BigDecimal decimalAmount = toBigDecimal(amount);
            BigDecimal sourceBalance = getTokensBalance(initiator);
            BigDecimal targetTokensBalance = getTokensBalance(to);
            if (sourceBalance.compareTo(decimalAmount) < 0) {
                throw new RuntimeException("the wallet " + initiator + " doesn't have enough tokens to transfer");
            }
            balances.put(initiator, sourceBalance.subtract(decimalAmount));
            balances.put(to, targetTokensBalance.add(decimalAmount));
        }
        return true;
    }

    @Override
    public boolean transferFrom(String from, String to, String amount) {
        contractIsNotFrozen();

        if (!from.equals(to)) {
            BigDecimal sourceBalance = getTokensBalance(from);
            BigDecimal targetTokensBalance = getTokensBalance(to);
            BigDecimal decimalAmount = toBigDecimal(amount);
            if (sourceBalance.compareTo(decimalAmount) < 0)
                throw new RuntimeException("unable transfer tokens! The balance of " + from + " less then " + amount);

            Map<String, BigDecimal> spender = allowed.get(from);
            if (spender == null || !spender.containsKey(initiator))
                throw new RuntimeException("unable transfer tokens! The wallet " + from + " not allow transfer tokens for " + to);

            BigDecimal allowTokens = spender.get(initiator);
            if (allowTokens.compareTo(decimalAmount) < 0) {
                throw new RuntimeException("unable transfer tokens! Not enough allowed tokens. For the wallet " + initiator + " allow only " + allowTokens + " tokens");
            }

            spender.put(initiator, allowTokens.subtract(decimalAmount));
            balances.put(from, sourceBalance.subtract(decimalAmount));
            balances.put(to, targetTokensBalance.add(decimalAmount));
        }
        return true;
    }

    @Override
    public void approve(String spender, String amount) {
        BigDecimal decimalAmount = toBigDecimal(amount);
        Map<String, BigDecimal> initiatorSpenders = allowed.get(initiator);
        if (initiatorSpenders == null) {
            Map<String, BigDecimal> newSpender = new HashMap<>();
            newSpender.put(spender, decimalAmount);
            allowed.put(initiator, newSpender);
        } else {
            BigDecimal spenderAmount = initiatorSpenders.get(spender);
            initiatorSpenders.put(spender, spenderAmount == null ? decimalAmount : spenderAmount.add(decimalAmount));
        }
    }

    @Override
    public boolean burn(String amount) {
        contractIsNotFrozen();
        BigDecimal decimalAmount = toBigDecimal(amount);
        BigDecimal sourceBalance = getTokensBalance(initiator);
        checkNegative(decimalAmount);
        if (sourceBalance.compareTo(decimalAmount) < 0) {
            throw new RuntimeException(String.format("the wallet %s doesn't have enough tokens to burn", initiator));
        }
        totalCoins = totalCoins.subtract(decimalAmount);
        balances.put(initiator, sourceBalance.subtract(decimalAmount));
        return true;
    }

    public String payable(BigDecimal amount, byte[] userData) {
        contractIsNotFrozen();
        if (freeCoins.compareTo(amount) < 0) throw new RuntimeException("not enough tokes to buy");
        balances.put(initiator, Optional.ofNullable(balances.get(initiator)).orElse(ZERO).add(amount));
        freeCoins = freeCoins.subtract(amount);
        return "Success.";
    }

    private void contractIsNotFrozen() {
        if (frozen) throw new RuntimeException("unavailable action! The smart-contract is frozen");
    }

    private BigDecimal toBigDecimal(String stringValue) {
        return new BigDecimal(stringValue).setScale(decimal, ROUND_DOWN);
    }

    private BigDecimal getTokensBalance(String address) {
        return Optional.ofNullable(balances.get(address)).orElseGet(() -> {
            balances.put(address, ZERO.setScale(decimal, ROUND_DOWN));
            return  ZERO.setScale(decimal, ROUND_DOWN);
        });
    }

    private void checkNegative(BigDecimal value) {
        if(value.compareTo(ZERO) < 0) {
            throw new IllegalArgumentException("the amount cannot be negative");
        }
    }
}`;

    let el = document.getElementsByClassName("w-content")[0];
    el.innerText = "";

    let Text = Resourse();

    let h2 = document.createElement("h2");
    h2.classList = "title";
    h2.innerText = Text.CreateToken_h2_1;
    el.appendChild(h2);

    let Fee = document.createElement("input");
    Fee.placeholder = "Fee";
    Fee.id = "Fee";
    Fee.classList = "main-input";
    el.appendChild(Fee);

    let p = document.createElement("p");
    p.className = "mb-20";
    p.innerText = Text.CreateToken_p_1;
    el.appendChild(p);

    div = document.createElement("div");
    div.className = "mb-20";
    el.appendChild(div);

    let textarea = document.createElement("div");
    textarea.className = "text_area_fluid";
    //textarea.innerText = Smart;
    textarea.id = "SmartEditor";
    div.appendChild(textarea);



    div = document.createElement("div");
    div.className = "row mb-50";
    el.appendChild(div);

    let button = document.createElement("a");
    button.className = "link fo_link";
    button.innerText = Text.CreateToken_button_1;
    button.onclick = () => {
        RenderCreateToken({
            Name: SmartName,
            Symbol: Symbol,
            Decimal: Decimal,
            TotalCoins: Spliter(TotalCoins)
        });
    };
    div.appendChild(button);

    button = document.createElement("a");
    button.className = "bold-link bttn margin_left_60";
    button.innerText = Text.CreateToken_button_2;
    button.id = "TokenDeploy";
    button.onclick = DeployToken;
    div.appendChild(button);

    var editor = ace.edit("SmartEditor");
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/java");
    editor.setValue(Smart);
    editor.setOptions({
        wrap: true
    });
}

function RenderExecuterSmartContract(Call)
{
    let Text = Resourse();

    let Cont = document.getElementsByClassName("w-content")[0];
    Cont.innerHTML = 
        `<h1 class="title 50">${Text.RenderSmartContract_h1_1}</h1>
        <a class="link mb-10">Back</a>
        <div class="lblock">
            <input class="main-input mb-10" placeholder="Search contract" id="PublicSmart">
            <div class="smart__p no-margin">
                <a class="bold-link bttn lupop"></a>
            </div>
        </div>
        <div id="Smart"></div>`;
    document.querySelectorAll(".w-content .lblock .bold-link.bttn.lupop")[0].onclick = SmartContractMetod;
    document.querySelectorAll(".w-content .link.mb-10")[0].onclick = RanderPayment;
    document.getElementById("PublicSmart").onchange = SmartContractMetod;
}

function SmartContractMetod()
{
    let PublicSmart = document.getElementById("PublicSmart").value;

    if (PublicSmart === "")
    {
        document.getElementById("Smart").innerHTML = "";
        return;
    }

    let Text = Resourse();

    Ajax({
        Url: `Api/${Url}/Api/SmartContract/${PublicSmart}`,
        Success: function (res)
        {
            if (res.length > 0)
            {
                let div = document.getElementById("Smart"); 
                let TextHtml =
                    `<p class="smart__p fontBold font_l_h_2 mb-10">
                        <input id="FogetNewState" type="checkbox">
                        Save the result on the blockchain 
                    </p>
                    <input class="main-input" id="Fee" placeholder="Fee">
                    <input class="main-input" id="UsedSmart" placeholder="Enter comma - separated public keys for smart contracts">
                    <p class="smart__p fontBold font_l_h_2 mb-10">${Text.RenderSmartContract_p_1}</p>
                    <select class="select mb-10 main-input" id="Method">`;

                for (let index in res)
                {
                    TextHtml += `<option value="${JSON.stringify(res[index].Arguments).replaceAll('"', "'")}" retype="${res[index].ReturnType}">${res[index].Name}</option>`;
                }

                TextHtml += 
                    `</select>
                    <div class="wrap_fields"></div>
                    <div class="center_a p_bot20"></div>
                    <div class="row around mb-50">
	                    <a class="bold-link bttn">${Text.RenderSmartContract_button_3}</a>
                    </div>`;
                div.innerHTML = TextHtml;
                document.querySelectorAll("#Smart .row.around.mb-50 .bold-link.bttn")[0].onclick = Execute;
                document.getElementById("Method").onchange = ArgSmartMethod;
                document.getElementById("Method").onchange();
            } 
            else
            {
                alert("Smart contract will not find or smart contrac don't have methods");
            }
        }
    });
}

function ArgSmartMethod() {
    let el = document.getElementsByClassName("wrap_fields")[0];

    if (el !== undefined) { 
        el.innerHTML = "";

        let select = document.getElementById("Method");
        let Value = JSON.parse(select.options[select.selectedIndex].value.replaceAll("'", '"'));

        for (let index in Value) {


            let p = document.createElement("p");
            p.innerText = Value[index].Name;
            el.appendChild(p);

            let input = document.createElement("input");
            input.className = "main-input";
            input.setAttribute("NumArt", index);
            input.setAttribute("ParType", Value[index].Type);
            el.appendChild(input);
        }
    }
}

function Execute() {
    let KeySmart = document.getElementById("PublicSmart").value;
    let method = document.getElementById("Method").options[document.getElementById("Method").selectedIndex].innerText;

    let paramEl = document.querySelectorAll("[numart]");
    let param = [];
    for (let index in paramEl) {
        if (paramEl[index].tagName === "INPUT") {
            switch (paramEl[index].attributes["ParType"].value) {
                case "java.lang.String":
                    param.push({ Key: "STRING", Value: paramEl[index].value });
                    break;
                case "double":
                    param.push({ Key: "DOUBLE", Value: paramEl[index].value });
                    break;
                case "int":
                    param.push({ Key: "INT", Value: paramEl[index].value });
                    break;
                case "bool":
                    param.push({ Key: "BOOL", Value: paramEl[index].value });
                    break;
            }
        }
    }

    let fee = document.getElementById("Fee");
    fee = fee === null ? "0.01" : fee.value === "" ? "0.01" : fee.value;
    let fns = document.getElementById("FogetNewState");
    fns = fns === null ? true : !fns.checked;
    let UserdSmart = document.getElementById("UsedSmart");
    UserdSmart = UserdSmart === null ? null : UserdSmart.value.split(",");

    Ajax({
        Url: `Api/${Url}/api/CreatePervStr`,
        Method: "POST",
        Data: JSON.stringify({
            Amount: "0,0",
            Fee: fee,
            Source: Base58.encode(Public),
            Target: KeySmart,
            Smart: {
                Method: method,
                Params: param,
                ForgetNewState: fns,
                UsedContract: UserdSmart
            }
        }),
        Success: function (Response) {

            Response.Priv = ConvertSign(Response.Priv);

            Ajax({
                Url: `Api/${Url}/api/Transaction`,
                Method: "POST",
                Data: JSON.stringify(Response),
                Success: function (res) {
                    let t = document.getElementById("Method").options[document.getElementById("Method").selectedIndex].attributes["retype"].value;
                    switch (t)
                    {
                        case "java.lang.String":
                            alert(res.Smart_contract_result.V_string);
                            break;
                        case "double":
                            alert(res.Smart_contract_result.V_double);
                            break;
                        case "int":
                            alert(res.Smart_contract_result.V_int);
                            break;
                        case "bool":
                            alert(res.Smart_contract_result.V_boolean);
                            break;
                    }
                }
            });

        }
    });
}

function RanderPayment(Obj)
{
    if (typeof Obj !== "object")
    {
        Obj = {};
    }

    let DefObj = {
        Key: undefined,
        Amount: undefined,
        Fee: undefined
    };

    for (let i in DefObj)
    {
        if (Obj[i] === undefined)
        {
            Obj[i] = DefObj[i];
        }
    }

    let Text = Resourse();

    document.getElementsByClassName("w-content")[0].innerHTML = "";
    let div2 = document.getElementsByClassName("w-content")[0];

    h2 = document.createElement("h2");
    h2.className = "title";
    h2.innerText = Text.Acc_h2_2;
    div2.appendChild(h2);

    let p = document.createElement("div");
    p.className = "mb-20";
    p.innerText = Text.Acc_Desc_4;
    div2.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-10";
    p.innerText = Text.Acc_Desc_6;
    div2.appendChild(p);

    Options = {
        ListClass: "select mb-10",
        Id: "Currency",
        ListOptions: []
    };

    div2.appendChild(GetSelect(Options));

    let label = document.createElement("label");
    label.className = "d-block mb-10";
    label.innerText = Text.Acc_Desc_7;
    div2.appendChild(label);

    let input = document.createElement("input");
    input.className = "main-input";
    input.id = "Address";
    input.value = Obj.Key === undefined ? "" : Obj.Key;
    input.placeholder = Text.Acc_placeholder_1;
    div2.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed";
    p.id = "ErrorAddress";
    div2.appendChild(p);

    label = document.createElement("label");
    label.className = "d-block mb-10";
    label.innerText = Text.Acc_Desc_8;
    div2.appendChild(label);

    input = document.createElement("input");
    input.className = "main-input";
    input.id = "Amount";
    input.value = Obj.Amount === undefined ? "" : Obj.Amount;
    input.placeholder = Text.Acc_placeholder_2;
    div2.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed";
    p.id = "ErrorAmount";
    div2.appendChild(p);

    label = document.createElement("label");
    label.className = "d-block mb-10";
    label.innerText = Text.Acc_Desc_9;
    div2.appendChild(label);

    input = document.createElement("input");
    input.className = "main-input";
    input.id = "Fee";
    input.value = Obj.Fee === undefined ? 0.1 : Obj.Fee;
    input.placeholder = Text.Acc_placeholder_3;
    div2.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed mb-50";
    p.id = "ErrorFee";
    div2.appendChild(p);

    label = document.createElement("label");
    label.className = "d-block mb-10";
    label.innerText = "User data (optional field)";
    div2.appendChild(label);

    input = document.createElement("input");
    input.className = "main-input";
    input.id = "UserData";
    input.placeholder = "Enter you data";
    div2.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed mb-50";
    p.id = "ErrorUserData";
    div2.appendChild(p);

    label = document.createElement("label");
    label.className = "d-block mb-10";
    label.innerText = "Used smart contracts (optional field)";
    div2.appendChild(label);

    input = document.createElement("input");
    input.className = "main-input";
    input.id = "UsedContracts";
    input.placeholder = "Enter comma - separated public keys for smart contracts";
    div2.appendChild(input);

    p = document.createElement("p");
    p.className = "textColorRed mb-50";
    p.id = "ErrorUserData";
    div2.appendChild(p);

    a = document.createElement("a");
    a.className = "bold-link bttn";
    a.innerText = Text.Acc_button_1;
    a.onclick = PreparingTransaction;
    div2.appendChild(a);

    UpdateBalance();
}

function Faq() {
    let Text = Resourse();

    let div = document.createElement("div");
    div.className = "faq_field";

    let h2 = document.createElement("h2");
    h2.className = "title main-text";
    h2.innerText = Text.FAQ_h2;
    div.appendChild(h2);

    let div2 = document.createElement("div");
    div2.className = "main-text hiddenly-ac hidden-faq";
    div.appendChild(div2);

    let a = document.createElement("a");
    a.className = "link";
    a.target = "_blank";
    a.href = "https://developers.credits.com/en/Articles/a_Accounts_and_Keyfiles";
    a.innerText = Text.FAQ_item_1;
    div2.appendChild(a);

    a = document.createElement("a");
    a.className = "link";
    a.target = "_blank";
    a.href = "https://developers.credits.com/en/Articles/a_How_to_use_Web_Wallet#Create%20a%20new%20account";
    a.innerText = Text.FAQ_item_2;
    div2.appendChild(a);

    a = document.createElement("a");
    a.className = "link";
    a.target = "_blank";
    a.href = "https://developers.credits.com/en/Articles/a_How_to_use_Web_Wallet#Sign%20in%20with%20a%20previously%20created%20user%20account";
    a.innerText = Text.FAQ_item_3;
    div2.appendChild(a);

    a = document.createElement("a");
    a.className = "link";
    a.target = "_blank";
    a.href = "https://developers.credits.com/en/Articles/a_Accounts_and_Keyfiles#Public%20and%20private%20keys";
    a.innerText = Text.FAQ_item_4;
    div2.appendChild(a);

    a = document.createElement("a");
    a.className = "link";
    a.target = "_blank";
    a.href = "https://developers.credits.com/en/Articles/a_Accounts_and_Keyfiles#Keyfile,%20what%20it%20is%20used%20for,%20how%20to%20create%20it";
    a.innerText = Text.FAQ_item_5;
    div2.appendChild(a);

    a = document.createElement("a");
    a.className = "link";
    a.target = "_blank";
    a.href = "https://developers.credits.com/en/Articles/a_How_to_use_Web_Wallet#Operations%20performed%20inside%20user%20wallet";
    a.innerText = Text.FAQ_item_6;
    div2.appendChild(a);

    return div;
}

function PreparingTransaction()
{


    let ErrorAddress = document.getElementById("ErrorAddress");
    let ErrorAmount = document.getElementById("ErrorAmount");
    let ErrorFee = document.getElementById("ErrorFee");
    let ErrorUserData = document.getElementById("UserData");
    let ErrorUsedContracts = document.getElementById("UsedContracts");
    
    ErrorAddress.innerText = "";
    ErrorAmount.innerText = "";
    ErrorFee.innerText = "";
    ErrorUserData.innerText = "";
    ErrorUsedContracts.innerText = "";

    let PublicTo = document.getElementById("Address").value;
    let Amount = document.getElementById("Amount").value;
    let Fee = document.getElementById("Fee").value;
    let UserData = document.getElementById("UserData").value;
    let UsedContracts = document.getElementById("UsedContracts").value;

    let Text = Resourse();

    if (PublicTo === "")
    {
        ErrorAddress.innerText = Text.Acc_input_1_error;
        return;
    }
    if (Amount === "")
    {
        ErrorAmount.innerText = Text.Acc_input_2_error;
        return;
    }
    if (Fee === "")
    {
        ErrorFee.innerText = Text.Acc_input_3_error;
        return;
    }

    if (UsedContracts === "")
    {
        UsedContracts = undefined;
    }
    else
    {
        UsedContracts = UsedContracts.split(",");
        for (let i in UsedContracts)
        {
            while (UsedContracts[i].match(/\s/, '') !== null)
            { 
                UsedContracts[i] = UsedContracts[i].replace(/\s/, '');
            }
        }
    }

    let CurrencyEL = document.getElementById("Currency");
    let Currency = document.getElementById("Currency").value;
    let Code = CurrencyEL.options[CurrencyEL.selectedIndex].innerText.split("(")[1].split(")")[0];

    if (Currency === "CS") {
        Ajax({
            Url: `Api/${Url}/api/CreatePervStr`,
            Method: "POST",
            Data: JSON.stringify({
                Amount: Amount,
                Fee: document.getElementById("Fee").value,
                Source: Base58.encode(Public),
                Target: PublicTo,
                UserData: UserData,
                UsedContracts: UsedContracts
            }),
            Success: function (Response) {

                if (Response.Target !== PublicTo) {
                    alert("Transaction was denied due to suspicious traffic");
                    return;
                }

                if (Response.Amount !== Amount.replace(/\,/, '.')) {
                    alert("Transaction was denied due to suspicious traffic");
                    return;
                }

                ChecPrice(Response, {
                    Fee: Fee,
                    PublicTo: PublicTo,
                    Amount: Amount,
                    Code: Code
                });
            }
        });
    } else {
        Ajax({
            Url: `Api/${Url}/api/CreatePervStr`,
            Method: "POST",
            Data: JSON.stringify({
                Amount: "0,0",
                Fee: document.getElementById("Fee").value,
                Source: Base58.encode(Public),
                Target: Currency,
                Smart: {
                    Method: "transfer",
                    ForgetNewState: false,
                    Params: [
                        { Key: "STRING", Value: PublicTo },
                        { Key: "STRING", Value: Amount.replace(/,/, '.') }
                    ]
                }
            }),
            Success: function (Response) {

                if (Response.Target !== Currency) {
                    alert("Transaction was denied due to suspicious traffic");
                    return;
                }

                if (Response.Amount !== "0,0") {
                    alert("Transaction was denied due to suspicious traffic");
                    return;
                }

                if (Response.Smart.Params[0].Value !== PublicTo) {
                    alert("Transaction was denied due to suspicious traffic");
                    return;
                }

                if (Response.Smart.Params[1].Value !== Amount.replace(/,/, '.')) {
                    alert("Transaction was denied due to suspicious traffic");
                    return;
                }

                ChecPrice(Response, {
                    Fee: Fee,
                    PublicTo: PublicTo,
                    Amount: Amount,
                    Code: Code
                });
            }
        });
    }

    
}

function ChecPrice(Trans, Obj)
{
    let req = new XMLHttpRequest();
    req.open("GET", "https://api.coinmarketcap.com/v1/ticker/credits/", true);
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let res = JSON.parse(req.responseText)[0];
            Obj.Usd = Math.round(res.price_usd * Obj.Fee * 10000)/10000;
            RenderPreparingTransaction(Trans, Obj);
        }
    };
}



function RenderPreparingTransaction(Trans, Obj) {
    let Text = Resourse();

    let div = document.getElementsByClassName("w-content")[0];
    div.innerHTML = "";

    let h2 = document.createElement("h2");
    h2.className = "title";
    h2.innerText = Text.ConfirmTrans_h2_1;
    div.appendChild(h2);

    let p = document.createElement("div");
    p.className = "mb-20 textColorRed";
    p.innerText = Text.ConfirmTrans_p_1;
    div.appendChild(p);

    p = document.createElement("div");
    p.innerText = Text.ConfirmTrans_p_2;
    div.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-30";
    div.appendChild(p);

    let span = document.createElement("span");
    span.className = "fontBold line_left";
    span.innerText = Obj.PublicTo;
    p.appendChild(span);

    p = document.createElement("div");
    p.innerText = Text.ConfirmTrans_p_3;
    div.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-30";
    div.appendChild(p);

    span = document.createElement("span");
    span.className = "fontBold line_left";
    span.innerText = `${Obj.Amount} ${Obj.Code}`;
    p.appendChild(span);

    p = document.createElement("div");
    p.innerText = Text.ConfirmTrans_p_4;
    div.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-30";
    div.appendChild(p);
    
    span = document.createElement("span");
    span.className = "fontBold line_left";
    span.innerText = `${Obj.Fee} CS (${Obj.Usd}$)`;
    p.appendChild(span);

    p = document.createElement("div");
    p.innerText = "Transaction";
    div.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-30";
    div.appendChild(p);

    let TextTrans = `{&nbsp;Amount: "${Trans.Amount}",
        &nbsp;Fee: "${Trans.Fee}",
        &nbsp;Id: "${Trans.Id}",
        &nbsp;Source: "${Trans.Source}",
        &nbsp;Target: "${Trans.Target}"`;

    if (Trans.Smart !== null)
    {
        TextTrans += `,&nbsp;Smart: {
            &nbsp;Method: "${Trans.Smart.Method}",
            &nbsp;Params: [
                {Key: "${Trans.Smart.Params[0].Key}", Value: "${Trans.Smart.Params[0].Value}"},
                {Key: "${Trans.Smart.Params[1].Key}", Value: "${Trans.Smart.Params[1].Value}"}
            ]
        }`;
    }

    TextTrans += `}`;


    span = document.createElement("span");
    span.className = "fontBold line_left";
    span.innerHTML = TextTrans;
    p.appendChild(span);

    p = document.createElement("div");
    p.innerText = "Signature";
    div.appendChild(p);

    p = document.createElement("div");
    p.className = "mb-30";
    div.appendChild(p);

    span = document.createElement("span");
    span.className = "fontBold line_left";
    span.innerText = `${Trans.Priv}`;
    p.appendChild(span);

    let div2 = document.createElement("div");
    div2.className = "row mb-50";
    div.appendChild(div2);

    let button = document.createElement("a");
    button.className = "link fo_link";
    button.innerText = Text.ConfirmTrans_button_1;
    button.onclick = () => {
        RanderPayment({
            Key: Obj.PublicTo,
            Amount: Obj.Amount,
            Fee: Obj.Fee
        });
    };
    div2.appendChild(button);

    button = document.createElement("a");
    button.className = "bold-link bttn margin_left_60";
    button.innerText = Text.ConfirmTrans_button_2;
    button.onclick = function () {
        ResultPayment(Trans, Obj);
    };
    div2.appendChild(button);
}

function ResultPayment(Trans, Obj) {
    Trans.Priv = ConvertSign(Trans.Priv);

    Ajax({
        Url: `Api/${Url}/api/Transaction`,
        Method: "POST",
        Data: JSON.stringify(Trans),
        Success: function (res) {
            if (res.Result === false) {
                alert(res.Message);
                return;
            }

            let Text = Resourse();

            let div = document.getElementsByClassName("w-content")[0];
            div.innerHTML = "";

            let h1 = document.createElement("h1");
            h1.className = "title compressed";
            h1.innerText = Text.ResultPayment_h1_1;
            div.appendChild(h1);

            let p = document.createElement("div");
            p.className = "mb-50";
            p.innerText = Text.ResultPayment_p_1;
            div.appendChild(p);

            p = document.createElement("div");
            p.className = "mb-20";
            p.innerText = Text.ResultPayment_p_2;
            div.appendChild(p);

            let span = document.createElement("span");
            span.className = "fontBold line_left";
            span.innerText = Obj.PublicTo;
            p.appendChild(span);

            p = document.createElement("div");
            p.className = "mb-20";
            p.innerText = Text.ResultPayment_p_3;
            div.appendChild(p);

            span = document.createElement("span");
            span.className = "fontBold line_left";
            span.innerText = `${Obj.Amount} ${Obj.Code}`;
            p.appendChild(span);

            p = document.createElement("div");
            p.className = "mb-20";
            p.innerText = Text.ResultPayment_p_4;
            div.appendChild(p);

            span = document.createElement("span");
            span.className = "fontBold line_left";
            span.innerText = Obj.Fee + " CS";
            p.appendChild(span);

            p = document.createElement("div");
            p.className = "mb-20";
            div.appendChild(p);

            let a = document.createElement("a");
            a.className = "link";
            a.target = "_blank";
            a.href = "https://monitor.credits.com/" + Monitor + "/account/" + Base58.encode(Public);
            a.innerText = Text.ResultPayment_link_1;
            p.appendChild(a);

            p = document.createElement("div");
            p.className = "mb-40 fontBold";
            div.appendChild(p);

            let button = document.createElement("a");
            button.className = "bold-link bttn margin_top_20";
            button.innerText = Text.ResultPayment_button_1;
            button.onclick = RanderPayment;
            p.appendChild(button);
        }
    });
}

function AddToken() {
    let SmartPublic = document.getElementById("SmartPublic").value;
    let SmartMnem = document.getElementById("SmartMnem").value;

    let Token = localStorage.getItem(Base58.encode(Public));
    if (Token === undefined) {
        Token = {};
        Token[SmartPublic] = SmartMnem;
    } else {
        Token = JSON.parse(Token);
        Token[SmartPublic] = SmartMnem;
    }
    localStorage.setItem(Base58.encode(Public), JSON.stringify(Token));

    RanderPayment();
}

function GetTokens() {
    let Token = localStorage.getItem(Base58.encode(Public));
    return JSON.parse(Token);
}

function UpdateBalance() {
    if (Public === undefined) {
        return;
    }

    Ajax({
        Url: `Api/${Url}/api/Balance/${Base58.encode(Public)}`,
        Success: function (r) {
            let Storag = {};
            for (var i in r) {
                if (r[i].publicKey === null)
                {
                    Storag["CS"] = { balance: r[i].balance, Text: "Credits (CS)" };
                }
                else
                { 
                    Storag[r[i].publicKey] = { balance: r[i].balance, Text: r[i].code };
                }
            }
            RenderBalance(Storag);
        }
    });
}

function RenderBalance(Storag) {
    var el = document.getElementById("Currency");
    if (el !== null) {
        el.innerText = "";
    }

    let children = document.getElementById("BalanceToken");
    if (children !== null) {
        children = children.children[0].innerText = "";
    }

    children = document.getElementById("Balance");
    if (children !== null) {
        children = children.children[0];
        children.innerText = "";
        var i = 0;
        for (var index in Storag) {

            InsertBalance(Storag[index].Text, Storag[index].balance, index, i);

            if (el !== null) { 
                let option = document.createElement("option");
                option.value = index;
                if (Storag[index].Text === "Credits (CS)") { 
                    option.innerText = Storag[index].Text;
                } else{ 
                    option.innerText = "Token (" + (Storag[index].Text === "" ? "T_" + i : Storag[index].Text) + ")";
                }
                document.getElementById("Currency").appendChild(option);
            }
            i++;
        }
    }
}

function InsertBalance(Name, Balance, Address, index) {
    let tr = document.createElement("tr");

    let td = document.createElement("td");
    td.className = "one";
    td.innerText = Name;
    tr.appendChild(td);

    if (Address !== undefined) {
        if (Address === "CS") {
            tr.innerText = "";
            td = document.createElement("td");
            td.className = "one";
            tr.appendChild(td);

            let img = document.createElement("img");
            img.className = "img-icon-crc";
            img.src = "https://credits.com/Content/img/icons/favicon.ico";
            td.appendChild(img);

            let span = document.createElement("span");
            span.innerText = Name;
            td.appendChild(span);



            td = document.createElement("td");
            td.className = "two";
            tr.appendChild(td);

            let div = document.createElement("div");
            div.className = "arrow-row";
            td.appendChild(div);

            let div2 = document.createElement("div");
            div2.className = "local-el";
            div2.id = "Balance_number";
            div2.innerText = Balance;
            div.append(div2);

            div2 = document.createElement("div");
            div2.className = "arrow-top";
            div2.onclick = PopapCoinMarketCap;
            div.appendChild(div2);

            document.getElementById("Balance").children[0].appendChild(tr);
        } else {
            let a = document.createElement("a");
            a.href = "https://monitor.credits.com/" + Monitor + "/token/" + Address;
            a.className = "link";
            a.target = "_blank";
            td.innerText = "";
            td.appendChild(a);

            if (Name === "") {
                a.innerText = "T";
                let sub = document.createElement("sub");
                sub.innerText = index;
                a.appendChild(sub);
            } else {
                a.innerText = Name;
            }

            td = document.createElement("td");
            td.className = "two";
            td.innerText = Balance;
            tr.appendChild(td);

            document.getElementById("BalanceToken").children[0].appendChild(tr);
        }
    }
}

function PopapCoinMarketCap() {
    let el = document.getElementById("CoinMarketCap");
    if (el !== undefined) { 
        if (el.style.display === "") {
            let Balance = document.getElementById("Balance_number");
            let req = new XMLHttpRequest();
            req.open("GET", "https://api.coinmarketcap.com/v1/ticker/credits/", true);
            req.send();
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    console.log(JSON.parse(req.responseText)[0]);
                    let res = JSON.parse(req.responseText)[0];

                    let table = document.createElement("table");

                    let tr = document.createElement("tr");
                    table.appendChild(tr);

                    let td = document.createElement("td");
                    td.innerText = res.price_usd * Balance.innerText;
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.innerText = " USD";
                    tr.appendChild(td);

                    tr = document.createElement("tr");
                    table.appendChild(tr);

                    td = document.createElement("td");
                    td.innerText = res.price_btc * Balance.innerText;
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.innerText = " BTC";
                    tr.appendChild(td);

                    el.innerText = "";
                    el.appendChild(table);
                    el.style.display = "block";
                }
            };
        } else {
            el.style.display = "";
        }
    }
}

function InputFile() {
    document.getElementById("KeyFile").click();
}

function CheckAmount(el) {
    while (/[^0-9|^\.]/.test(el.value)) {
        el.value = el.value.replace(/[^0-9|^\.]/, "");
    }
}

function GetSelect(Option) {
    var DefOption = {
        ListClass: "",
        Id: "",
        Name: "",
        ListOptions: [],
        change: null
    };

    for (var Index in DefOption) {
        if (Option[Index] === undefined)
            Option[Index] = DefOption[Index];
    }

    var ElSelect = document.createElement("select");
    ElSelect.className = Option.ListClass;
    ElSelect.id = Option.Id;
    ElSelect.name = Option.Name;

    if (Option.change !== null) {
        ElSelect.onchange = Option.change;
    }

    for (var index in Option.ListOptions) {
        var val = Option.ListOptions[index];
        var ElementOption = document.createElement("option");
        ElementOption.innerText = val.Text;
        ElementOption.value = val.Value;
        if (val.attr !== undefined) {
            for (var i in val.attr) {
                var v = val.attr[i];
                ElementOption.setAttribute(v.Name, v.Value);
            }
        }
        if (val.Selected)
            ElementOption.selected = val.Selected;
        ElSelect.appendChild(ElementOption);
    }
    return ElSelect;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires === "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function ReadFile() {
    var selectedFile = document.getElementById('KeyFile').files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("ErrorFileKey").innerText = "";

        var FileContent = e.target.result;
        var Obj;
        var Text = Resourse();

        try {
            Obj = JSON.parse(FileContent);
        } catch (e) {
            document.getElementById("ErrorFileKey").innerText = Text.SignIn_button_2_Error;
            return;
        }

        if (Obj.key.public === undefined || Obj.key.private === undefined) {
            document.getElementById("ErrorFileKey").innerText = Text.SignIn_button_2_Error;
            return;
        }

        document.getElementById("Public").value = Obj.key.public;
        document.getElementById("Private").value = Obj.key.private;


        document.getElementById("OpenAcc").click();
    };
    reader.readAsText(selectedFile);
}

function DownloadFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

var ChecDeployToken = true;



function DeployToken() {

    if (ChecDeployToken) { 
        ChecDeployToken = false;
        try { 
            let smart = ace.edit("SmartEditor");
            smart = smart.getValue();

            let fee = document.getElementById("Fee");
            fee = fee === null ? "0.01" : fee.value === "" ? "0.01" : fee.value;

            Ajax({
                Url: `Api/${Url}/api/CreatePervStr`,
                Method: "POST",
                Data: JSON.stringify({
                    Amount: "0.0",
                    Fee: fee,
                    Source: Base58.encode(Public),
                    Smart: {
                        ForgetNewState: false,
                        Code: smart
                    }
                }),
                Success: function (Response) {

                    Response.Priv = ConvertSign(Response.Priv);

                    Ajax({
                        Url: `Api/${Url}/api/Transaction`,
                        Method: "POST",
                        Data: JSON.stringify(Response),
                        Success: function (res) {
                            ChecDeployToken = true;
                            RanderPayment();
                        }
                    });

                }
            });
        } catch (e) {
            ChecDeployToken = true;
        }
    }
}

function PopapRegisterCheck() {
    if (document.getElementById("CheckAllow1").checked && document.getElementById("CheckAllow2").checked)
    {
        document.getElementById("RegisterAllow").onclick = NewKey;
        document.getElementById("RegisterAllow").classList.remove("disabled-bttn-awr");
    }
    else
    {
        document.getElementById("RegisterAllow").onclick = null;
        document.getElementById("RegisterAllow").classList.add("disabled-bttn-awr");
    }
}

function PopapRegister() {
    let cont = document.createElement("div");
    cont.className = "popup-bg";

    let div = document.createElement("div");
    div.className = "popup-alert-wrap";
    cont.appendChild(div);

    let p = document.createElement("p");
    p.className = "big-awr";
    p.innerText = "Before you get started";
    div.appendChild(p);

    p = document.createElement("p");
    p.className = "small-awr";
    p.innerHTML = "Credits Wallet does not collect or store <br />any information about you.";
    div.appendChild(p);

    let hr = document.createElement("hr");
    hr.className = "hr-awr";
    div.appendChild(hr);

    p = document.createElement("p");
    p.className = "row-awr";
    div.appendChild(p);

    let input = document.createElement("input");
    input.className = "inp-awr";
    input.type = "checkbox";
    input.onclick = PopapRegisterCheck;
    input.id = "CheckAllow1";
    p.appendChild(input);

    let span = document.createElement("p");
    span.className = "mid-awr";
    span.innerText = "I accept that my funds are stored on this account and it is impossible to recover account access if it is lost.";
    p.appendChild(span);

    p = document.createElement("p");
    p.className = "row-awr";
    div.appendChild(p);

    input = document.createElement("input");
    input.className = "inp-awr";
    input.type = "checkbox";
    input.id = "CheckAllow2";
    input.onclick = PopapRegisterCheck;
    p.appendChild(input);

    span = document.createElement("span");
    span.className = "mid-awr";
    span.innerText = "I accept that the transfer of access keys or an access file to second parties can lead to theft of funds available on the account.";
    p.appendChild(span);

    let a = document.createElement("a");
    a.className = "bold-link bttn disabled-bttn-awr mb-20";
    a.innerText = "Send";
    a.id = "RegisterAllow";
    div.appendChild(a);

    p = document.createElement("p");
    p.className = "re-awr";
    div.appendChild(p);

    a = document.createElement("a");
    a.className = "link_grey";
    a.innerText = "I do not approve";
    a.href = "http://wallet.credits.com";
    p.appendChild(a);

    document.getElementsByTagName("body")[0].appendChild(cont);
}

function Ajax(Obj) {
    let DefObj = {
        Url: "",
        Method: "Get",
        Data: null,
        Success: function (r) { }
    };

    for (var i in DefObj) {
        if (Obj[i] === undefined) {
            Obj[i] = DefObj[i];
        }
    }

    if (Obj.Url === "") {
        return { Error: "Url is not found" };
    }

    let req = new XMLHttpRequest();
    req.open(Obj.Method, Obj.Url, true);
    req.setRequestHeader('Content-Type', 'application/json');

    Loader();

    try
    {
        if (Obj.Data === null) {
            req.send();
        }
        else {
            req.send(Obj.Data);
        }
    } catch (ex) { console.log(ex); }

    req.onreadystatechange = function ()
    {
        if (req.readyState === 4) {
            CloseLoader();
            if (req.status === 200) {
                Obj.Success(JSON.parse(req.responseText));
            }
            else
            {
                alert(JSON.parse(req.responseText));
            }
        }
    };
}

function ConvertSign(Priv) {
    let Sign = new Uint8Array(Priv.length / 2);

    var ArHex = "0123456789ABCDEF";

    for (let i = 0; i < Priv.length; i++) {
        for (let j = 0; j < ArHex.length; j++) {
            if (ArHex[j] === Priv[i]) {
                Sign[i / 2] += Number(j) * 16;
            }

            if (ArHex[j] === Priv[i + 1]) {
                Sign[i / 2] += Number(j);
            }
        }
        i++;
    }

    Sign = nacl.sign.detached(Sign, Private);
    Priv = "";
    for (var j = 0; j < Sign.length; j++) {
        Priv += ArHex[Math.floor(Sign[j] / 16)];
        Priv += ArHex[Math.floor(Sign[j] % 16)];
    }
    return Priv;
}

function Spliter(str)
{
    let leng = Math.floor(str.length / 3);
    while (leng > 0) {
        let i = str.length - leng * 3;
        str = str.substr(0, i) + " " + str.substr(i);
        leng = leng - 1;
    }
    return str;
}