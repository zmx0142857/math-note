// AMsymbols.js

var AM = {};

(function(){

//false to return to legacy phi/varphi mapping
var fixphi = true;

// token types
var CONST = 0, UNARY = 1, BINARY = 2, INFIX = 3, LEFTBRACKET = 4, RIGHTBRACKET = 5, SPACE = 6, UNDEROVER = 7, DEFINITION = 8, LEFTRIGHT = 9, TEXT = 10, BIG = 11, LONG = 12, STRETCHY = 13, MATRIX = 14, UNARYUNDEROVER = 15;

// character lists for Mozilla/Netscape fonts
var AMcal = ["\uD835\uDC9C","\u212C","\uD835\uDC9E","\uD835\uDC9F","\u2130","\u2131","\uD835\uDCA2","\u210B","\u2110","\uD835\uDCA5","\uD835\uDCA6","\u2112","\u2133","\uD835\uDCA9","\uD835\uDCAA","\uD835\uDCAB","\uD835\uDCAC","\u211B","\uD835\uDCAE","\uD835\uDCAF","\uD835\uDCB0","\uD835\uDCB1","\uD835\uDCB2","\uD835\uDCB3","\uD835\uDCB4","\uD835\uDCB5","\uD835\uDCB6","\uD835\uDCB7","\uD835\uDCB8","\uD835\uDCB9","\u212F","\uD835\uDCBB","\u210A","\uD835\uDCBD","\uD835\uDCBE","\uD835\uDCBF","\uD835\uDCC0","\uD835\uDCC1","\uD835\uDCC2","\uD835\uDCC3","\u2134","\uD835\uDCC5","\uD835\uDCC6","\uD835\uDCC7","\uD835\uDCC8","\uD835\uDCC9","\uD835\uDCCA","\uD835\uDCCB","\uD835\uDCCC","\uD835\uDCCD","\uD835\uDCCE","\uD835\uDCCF"],

AMfrk = ["\uD835\uDD04","\uD835\uDD05","\u212D","\uD835\uDD07","\uD835\uDD08","\uD835\uDD09","\uD835\uDD0A","\u210C","\u2111","\uD835\uDD0D","\uD835\uDD0E","\uD835\uDD0F","\uD835\uDD10","\uD835\uDD11","\uD835\uDD12","\uD835\uDD13","\uD835\uDD14","\u211C","\uD835\uDD16","\uD835\uDD17","\uD835\uDD18","\uD835\uDD19","\uD835\uDD1A","\uD835\uDD1B","\uD835\uDD1C","\u2128","\uD835\uDD1E","\uD835\uDD1F","\uD835\uDD20","\uD835\uDD21","\uD835\uDD22","\uD835\uDD23","\uD835\uDD24","\uD835\uDD25","\uD835\uDD26","\uD835\uDD27","\uD835\uDD28","\uD835\uDD29","\uD835\uDD2A","\uD835\uDD2B","\uD835\uDD2C","\uD835\uDD2D","\uD835\uDD2E","\uD835\uDD2F","\uD835\uDD30","\uD835\uDD31","\uD835\uDD32","\uD835\uDD33","\uD835\uDD34","\uD835\uDD35","\uD835\uDD36","\uD835\uDD37"],

AMbbb = ["\uD835\uDD38","\uD835\uDD39","\u2102","\uD835\uDD3B","\uD835\uDD3C","\uD835\uDD3D","\uD835\uDD3E","\u210D","\uD835\uDD40","\uD835\uDD41","\uD835\uDD42","\uD835\uDD43","\uD835\uDD44","\u2115","\uD835\uDD46","\u2119","\u211A","\u211D","\uD835\uDD4A","\uD835\uDD4B","\uD835\uDD4C","\uD835\uDD4D","\uD835\uDD4E","\uD835\uDD4F","\uD835\uDD50","\u2124","\uD835\uDD52","\uD835\uDD53","\uD835\uDD54","\uD835\uDD55","\uD835\uDD56","\uD835\uDD57","\uD835\uDD58","\uD835\uDD59","\uD835\uDD5A","\uD835\uDD5B","\uD835\uDD5C","\uD835\uDD5D","\uD835\uDD5E","\uD835\uDD5F","\uD835\uDD60","\uD835\uDD61","\uD835\uDD62","\uD835\uDD63","\uD835\uDD64","\uD835\uDD65","\uD835\uDD66","\uD835\uDD67","\uD835\uDD68","\uD835\uDD69","\uD835\uDD6A","\uD835\uDD6B"],

AMsqrt={input:"sqrt",tag:"msqrt",output:"sqrt",tex:null,ttype:UNARY},
AMroot={input:"root",tag:"mroot",output:"root",tex:null,ttype:BINARY},
AMfrac={input:"frac",tag:"mfrac",output:"/",tex:null,ttype:BINARY},
AMdiv={input:"/",tag:"mfrac",output:"/",tex:null,ttype:INFIX},
AMover={input:"stackrel",tag:"mover",output:"stackrel",tex:null,ttype:BINARY},
AMsub={input:"_",tag:"msub",output:"_",tex:null,ttype:INFIX},
AMsup={input:"^",tag:"msup",output:"^",tex:null,ttype:INFIX},
AMtext={input:"text",tag:"mtext",output:"text",tex:null,ttype:TEXT},
AMmbox={input:"mbox",tag:"mtext",output:"mbox",tex:null,ttype:TEXT},
AMquote={input:"\"",tag:"mtext",output:"mbox",tex:null,ttype:TEXT};

AM.quote = AMquote;
AM.symbols = [
//some greek symbols
{input:"alpha",  tag:"mi", output:"\u03B1", tex:null, ttype:CONST},
{input:"beta",   tag:"mi", output:"\u03B2", tex:null, ttype:CONST},
{input:"chi",    tag:"mi", output:"\u03C7", tex:null, ttype:CONST},
{input:"delta",  tag:"mi", output:"\u03B4", tex:null, ttype:CONST},
{input:"Delta",  tag:"mo", output:"\u0394", tex:null, ttype:CONST},
{input:"epsi",   tag:"mi", output:"\u03B5", tex:"epsilon", ttype:CONST},
{input:"varepsilon", tag:"mi", output:"\u025B", tex:null, ttype:CONST},
{input:"eta",    tag:"mi", output:"\u03B7", tex:null, ttype:CONST},
{input:"gamma",  tag:"mi", output:"\u03B3", tex:null, ttype:CONST},
{input:"Gamma",  tag:"mo", output:"\u0393", tex:null, ttype:CONST},
{input:"iota",   tag:"mi", output:"\u03B9", tex:null, ttype:CONST},
{input:"kappa",  tag:"mi", output:"\u03BA", tex:null, ttype:CONST},
{input:"lambda", tag:"mi", output:"\u03BB", tex:null, ttype:CONST},
{input:"Lambda", tag:"mo", output:"\u039B", tex:null, ttype:CONST},
{input:"lamda", tag:"mi", output:"\u03BB", tex:null, ttype:DEFINITION},
{input:"Lamda", tag:"mo", output:"\u039B", tex:null, ttype:DEFINITION},
{input:"mu",     tag:"mi", output:"\u03BC", tex:null, ttype:CONST},
{input:"nu",     tag:"mi", output:"\u03BD", tex:null, ttype:CONST},
{input:"omega",  tag:"mi", output:"\u03C9", tex:null, ttype:CONST},
{input:"Omega",  tag:"mo", output:"\u03A9", tex:null, ttype:CONST},
{input:"phi",    tag:"mi", output:fixphi?"\u03D5":"\u03C6", tex:null, ttype:CONST},
{input:"varphi", tag:"mi", output:fixphi?"\u03C6":"\u03D5", tex:null, ttype:CONST},
{input:"Phi",    tag:"mo", output:"\u03A6", tex:null, ttype:CONST},
{input:"pi",     tag:"mi", output:"\u03C0", tex:null, ttype:CONST},
{input:"Pi",     tag:"mo", output:"\u03A0", tex:null, ttype:CONST},
{input:"psi",    tag:"mi", output:"\u03C8", tex:null, ttype:CONST},
{input:"Psi",    tag:"mi", output:"\u03A8", tex:null, ttype:CONST},
{input:"rho",    tag:"mi", output:"\u03C1", tex:null, ttype:CONST},
{input:"sigma",  tag:"mi", output:"\u03C3", tex:null, ttype:CONST},
{input:"Sigma",  tag:"mo", output:"\u03A3", tex:null, ttype:CONST},
{input:"tau",    tag:"mi", output:"\u03C4", tex:null, ttype:CONST},
{input:"theta",  tag:"mi", output:"\u03B8", tex:null, ttype:CONST},
{input:"vartheta", tag:"mi", output:"\u03D1", tex:null, ttype:CONST},
{input:"Theta",  tag:"mo", output:"\u0398", tex:null, ttype:CONST},
{input:"upsilon", tag:"mi", output:"\u03C5", tex:null, ttype:CONST},
{input:"xi",     tag:"mi", output:"\u03BE", tex:null, ttype:CONST},
{input:"Xi",     tag:"mo", output:"\u039E", tex:null, ttype:CONST},
{input:"zeta",   tag:"mi", output:"\u03B6", tex:null, ttype:CONST},

/* script symbols
{input:"scA",	tag:"mo", output:"\u1D49C", tex:null, ttype:CONST},
{input:"scB",	tag:"mo", output:"\u1D49D", tex:null, ttype:CONST},
{input:"scC",	tag:"mo", output:"\u1D49E", tex:null, ttype:CONST},
{input:"scD",	tag:"mo", output:"\u1D49F", tex:null, ttype:CONST},
{input:"scE",	tag:"mo", output:"\u1D4A0", tex:null, ttype:CONST},
{input:"scF",	tag:"mo", output:"\u1D4A1", tex:null, ttype:CONST},
{input:"scG",	tag:"mo", output:"\u1D4A2", tex:null, ttype:CONST},
{input:"scH",	tag:"mo", output:"\u1D4A3", tex:null, ttype:CONST},
{input:"scI",	tag:"mo", output:"\u1D4A4", tex:null, ttype:CONST},
{input:"scJ",	tag:"mo", output:"\u1D4A5", tex:null, ttype:CONST},
{input:"scK",	tag:"mo", output:"\u1D4A6", tex:null, ttype:CONST},
{input:"scL",	tag:"mo", output:"\u1D4A7", tex:null, ttype:CONST},
{input:"scM",	tag:"mo", output:"\u1D4A8", tex:null, ttype:CONST},
{input:"scN",	tag:"mo", output:"\u1D4A9", tex:null, ttype:CONST},
{input:"scO",	tag:"mo", output:"\u1D4AA", tex:null, ttype:CONST},
{input:"scP",	tag:"mo", output:"&#x1D4AB;", tex:null, ttype:CONST},
{input:"scQ",	tag:"mo", output:"\u1D4AC", tex:null, ttype:CONST},
{input:"scR",	tag:"mo", output:"\u1D4AD", tex:null, ttype:CONST},
{input:"scS",	tag:"mo", output:"\u1D4AE", tex:null, ttype:CONST},
{input:"scT",	tag:"mo", output:"\u1D4AF", tex:null, ttype:CONST},
{input:"scU",	tag:"mo", output:"\u1D4B0", tex:null, ttype:CONST},
{input:"scV",	tag:"mo", output:"\u1D4B1", tex:null, ttype:CONST},
{input:"scW",	tag:"mo", output:"\u1D4B2", tex:null, ttype:CONST},
{input:"scX",	tag:"mo", output:"\u1D4B3", tex:null, ttype:CONST},
{input:"scY",	tag:"mo", output:"\u1D4B4", tex:null, ttype:CONST},
{input:"scZ",	tag:"mo", output:"\u1D4B5", tex:null, ttype:CONST},

{input:"sca",	tag:"mi", output:"\u1D4B6", tex:null, ttype:CONST},
{input:"scb",	tag:"mi", output:"\u1D4B7", tex:null, ttype:CONST},
{input:"scc",	tag:"mi", output:"\u1D4B8", tex:null, ttype:CONST},
{input:"scd",	tag:"mi", output:"\u1D4B9", tex:null, ttype:CONST},
{input:"sce",	tag:"mi", output:"\u1D4BA", tex:null, ttype:CONST},
{input:"scf",	tag:"mi", output:"\u1D4BB", tex:null, ttype:CONST},
{input:"scg",	tag:"mi", output:"\u1D4BC", tex:null, ttype:CONST},
{input:"sch",	tag:"mi", output:"\u1D4BD", tex:null, ttype:CONST},
{input:"sci",	tag:"mi", output:"\u1D4BE", tex:null, ttype:CONST},
{input:"scj",	tag:"mi", output:"\u1D4BF", tex:null, ttype:CONST},
{input:"sck",	tag:"mi", output:"\u1D4C0", tex:null, ttype:CONST},
{input:"scl",	tag:"mi", output:"\u1D4C1", tex:null, ttype:CONST},
{input:"scm",	tag:"mi", output:"\u1D4C2", tex:null, ttype:CONST},
{input:"scn",	tag:"mi", output:"\u1D4C3", tex:null, ttype:CONST},
{input:"sco",	tag:"mi", output:"\u1D4C4", tex:null, ttype:CONST},
{input:"scp",	tag:"mi", output:"\u1D4C5", tex:null, ttype:CONST},
{input:"scq",	tag:"mi", output:"\u1D4C6", tex:null, ttype:CONST},
{input:"scr",	tag:"mi", output:"\u1D4C7", tex:null, ttype:CONST},
{input:"scs",	tag:"mi", output:"\u1D4C8", tex:null, ttype:CONST},
{input:"sct",	tag:"mi", output:"\u1D4C9", tex:null, ttype:CONST},
{input:"scu",	tag:"mi", output:"\u1D4CA", tex:null, ttype:CONST},
{input:"scv",	tag:"mi", output:"\u1D4CB", tex:null, ttype:CONST},
{input:"scw",	tag:"mi", output:"\u1D4CC", tex:null, ttype:CONST},
{input:"scx",	tag:"mi", output:"\u1D4CD", tex:null, ttype:CONST},
{input:"scy",	tag:"mi", output:"\u1D4CE", tex:null, ttype:CONST},
{input:"scz",	tag:"mi", output:"\u1D4CF", tex:null, ttype:CONST},
*/

//binary operation symbols
//{input:"-",  tag:"mo", output:"\u0096", tex:null, ttype:CONST},
{input:"*",  tag:"mo", output:"\u22C5", tex:"cdot", ttype:CONST},
{input:"**", tag:"mo", output:"\u2217", tex:"ast", ttype:CONST},
{input:"***", tag:"mo", output:"\u22C6", tex:"star", ttype:CONST},
{input:"//", tag:"mo", output:"/",      tex:null, ttype:CONST},
{input:"\\\\", tag:"mo", output:"\\",   tex:"backslash", ttype:CONST},
{input:"setminus", tag:"mo", output:"\\", tex:null, ttype:CONST},
{input:"xx", tag:"mo", output:"\u00D7", tex:"times", ttype:CONST},
{input:"|><", tag:"mo", output:"\u22C9", tex:"ltimes", ttype:CONST},
{input:"><|", tag:"mo", output:"\u22CA", tex:"rtimes", ttype:CONST},
{input:"|><|", tag:"mo", output:"\u22C8", tex:"bowtie", ttype:CONST},
{input:"-:", tag:"mo", output:"\u00F7", tex:"div", ttype:CONST},
{input:"divide",   tag:"mo", output:"-:", tex:null, ttype:DEFINITION},
{input:"@",  tag:"mo", output:"\u2218", tex:"circ", ttype:CONST},
{input:"o+", tag:"mo", output:"\u2295", tex:"oplus", ttype:CONST},
{input:"ox", tag:"mo", output:"\u2297", tex:"otimes", ttype:CONST},
{input:"o.", tag:"mo", output:"\u2299", tex:"odot", ttype:CONST},
{input:"sum", tag:"mo", output:"\u2211", tex:null, ttype:UNDEROVER},
{input:"prod", tag:"mo", output:"\u220F", tex:null, ttype:UNDEROVER},
{input:"^^",  tag:"mo", output:"\u2227", tex:"wedge", ttype:CONST},
{input:"^^^", tag:"mo", output:"\u22C0", tex:"bigwedge", ttype:UNDEROVER},
{input:"vv",  tag:"mo", output:"\u2228", tex:"vee", ttype:CONST},
{input:"vvv", tag:"mo", output:"\u22C1", tex:"bigvee", ttype:UNDEROVER},
{input:"nn",  tag:"mo", output:"\u2229", tex:"cap", ttype:CONST},
{input:"nnn", tag:"mo", output:"\u22C2", tex:"bigcap", ttype:UNDEROVER},
{input:"uu",  tag:"mo", output:"\u222A", tex:"cup", ttype:CONST},
{input:"uuu", tag:"mo", output:"\u22C3", tex:"bigcup", ttype:UNDEROVER},

//binary relation symbols
{input:"!=",  tag:"mo", output:"\u2260", tex:"ne", ttype:CONST},
{input:":=",  tag:"mo", output:":=",     tex:null, ttype:CONST},
{input:"lt",  tag:"mo", output:"<",      tex:null, ttype:CONST},
{input:"<=",  tag:"mo", output:"\u2264", tex:"le", ttype:CONST},
{input:"lt=", tag:"mo", output:"\u2264", tex:"leq", ttype:CONST},
{input:"gt",  tag:"mo", output:">",      tex:null, ttype:CONST},
{input:">=",  tag:"mo", output:"\u2265", tex:"ge", ttype:CONST},
{input:"gt=", tag:"mo", output:"\u2265", tex:"geq", ttype:CONST},
{input:"-<",  tag:"mo", output:"\u227A", tex:"prec", ttype:CONST},
{input:"-lt", tag:"mo", output:"\u227A", tex:null, ttype:CONST},
{input:">-",  tag:"mo", output:"\u227B", tex:"succ", ttype:CONST},
{input:"-<=", tag:"mo", output:"\u2AAF", tex:"preceq", ttype:CONST},
{input:">-=", tag:"mo", output:"\u2AB0", tex:"succeq", ttype:CONST},
{input:"in",  tag:"mo", output:"\u2208", tex:null, ttype:CONST},
{input:"!in", tag:"mo", output:"\u2209", tex:"notin", ttype:CONST},
{input:"sub", tag:"mo", output:"\u2282", tex:"subset", ttype:CONST},
{input:"sup", tag:"mo", output:"\u2283", tex:"supset", ttype:CONST},
{input:"sube", tag:"mo", output:"\u2286", tex:"subseteq", ttype:CONST},
{input:"supe", tag:"mo", output:"\u2287", tex:"supseteq", ttype:CONST},
{input:"-=",  tag:"mo", output:"\u2261", tex:"equiv", ttype:CONST},
{input:"~=",  tag:"mo", output:"\u2245", tex:"cong", ttype:CONST},
{input:"cong",tag:"mo",output:"~=",tex:null,ttype:DEFINITION},
{input:"~~",  tag:"mo", output:"\u2248", tex:"approx", ttype:CONST},
{input:"prop", tag:"mo", output:"\u221D", tex:"propto", ttype:CONST},

{input:"==",  tag:"mo", output:"\u2550\u2550\u2550\u2550", tex:null, ttype:CONST},
{input:"====",  tag:"mo", output:"\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550", tex:null, ttype:CONST},
{input:"////", tag:"mo", output:"\u2225", tex:null, ttype:CONST},
{input:"!//", tag:"mo", output:"\u2226", tex:null, ttype:CONST},
{input:"S=",  tag:"mo", output:"\u224C", tex:null, ttype:CONST},
{input:"!-=",  tag:"mo", output:"\u2262", tex:null, ttype:CONST},
{input:"!|", tag:"mo", output:"\u2224", tex:null, ttype:CONST},
{input:"!sube", tag:"mo", output:"\u2288", tex:null, ttype:CONST},
{input:"!supe", tag:"mo", output:"\u2289", tex:null, ttype:CONST},
{input:"subne", tag:"mo", output:"\u228A", tex:null, ttype:CONST},
{input:"supne", tag:"mo", output:"\u228B", tex:null, ttype:CONST},
{input:"normal", tag:"mo", output:"\u22B4", tex:null, ttype:CONST},

//logical symbols
{input:"and", tag:"mtext", output:"and", tex:null, ttype:SPACE},
{input:"or",  tag:"mtext", output:"or",  tex:null, ttype:SPACE},
{input:"not", tag:"mo", output:"\u00AC", tex:"neg", ttype:CONST},
{input:"=>",  tag:"mo", output:"\u21D2", tex:"implies", ttype:CONST},
{input:"implies",tag:"mo",output:"=>",tex:null,ttype:DEFINITION},
{input:"if",  tag:"mo", output:"if",     tex:null, ttype:SPACE},
{input:"<=>", tag:"mo", output:"\u21D4", tex:"iff", ttype:CONST},
{input:"iff",tag:"mo",output:"<=>",tex:null,ttype:DEFINITION},
{input:"AA",  tag:"mo", output:"\u2200", tex:"forall", ttype:CONST},
{input:"EE",  tag:"mo", output:"\u2203", tex:"exists", ttype:CONST},
{input:"_|_", tag:"mo", output:"\u22A5", tex:"bot", ttype:CONST},
{input:"TT",  tag:"mo", output:"\u22A4", tex:"top", ttype:CONST},
{input:"|--",  tag:"mo", output:"\u22A2", tex:"vdash", ttype:CONST},
{input:"|==",  tag:"mo", output:"\u22A8", tex:"models", ttype:CONST},

//grouping brackets
{input:"(", tag:"mo", output:"(", tex:null, ttype:LEFTBRACKET},
{input:")", tag:"mo", output:")", tex:null, ttype:RIGHTBRACKET},
{input:"[", tag:"mo", output:"[", tex:null, ttype:LEFTBRACKET},
{input:"]", tag:"mo", output:"]", tex:null, ttype:RIGHTBRACKET},
{input:"{", tag:"mo", output:"{", tex:"lbrace", ttype:LEFTBRACKET},
{input:"}", tag:"mo", output:"}", tex:"rbrace", ttype:RIGHTBRACKET},
{input:"|", tag:"mo", output:"|", tex:null, ttype:LEFTRIGHT},
//{input:"||", tag:"mo", output:"||", tex:null, ttype:LEFTRIGHT},
{input:"(:", tag:"mo", output:"\u2329", tex:"langle", ttype:LEFTBRACKET},
{input:":)", tag:"mo", output:"\u232A", tex:"rangle", ttype:RIGHTBRACKET},
{input:"<<", tag:"mo", output:"\u2329", tex:"langle", ttype:LEFTBRACKET},
{input:">>", tag:"mo", output:"\u232A", tex:"rangle", ttype:RIGHTBRACKET},
{input:"{:", tag:"mo", output:"{:", tex:null, ttype:LEFTBRACKET, invisible:true},
{input:":}", tag:"mo", output:":}", tex:null, ttype:RIGHTBRACKET, invisible:true},

//miscellaneous symbols
{input:"int",tag:"mo",output:"\u222B",tex:null,ttype:CONST},
{input:"dx",tag:"mi",output:"{:d x:}",tex:null,ttype:DEFINITION},
{input:"dy",tag:"mi",output:"{:d y:}",tex:null,ttype:DEFINITION},
{input:"dz",tag:"mi",output:"{:d z:}",tex:null,ttype:DEFINITION},
{input:"dt",tag:"mi",output:"{:d t:}",tex:null,ttype:DEFINITION},
{input:"oint",tag:"mo",output:"\u222E",tex:null,ttype:CONST},
{input:"del",tag:"mo",output:"\u2202",tex:"partial",ttype:CONST},
{input:"grad",tag:"mo",output:"\u2207",tex:"nabla",ttype:CONST},
{input:"+-",tag:"mo",output:"\u00B1",tex:"pm",ttype:CONST},
{input:"O/",tag:"mo",output:"\u2205",tex:"emptyset",ttype:CONST},
{input:"oo",tag:"mo",output:"\u221E",tex:"infty",ttype:CONST},
{input:"aleph",tag:"mo",output:"\u2135",tex:null,ttype:CONST},
{input:"...",tag:"mo",output:"...",tex:"ldots",ttype:CONST},
{input:":.",tag:"mo",output:"\u2234",tex:"therefore",ttype:CONST},
{input:"/_",tag:"mo",output:"\u2220",tex:"angle",ttype:CONST},
{input:"/_\\",tag:"mo",output:"\u25B3",tex:"triangle",ttype:CONST},
{input:"\\ ",tag:"mo",output:"\u00A0",tex:null,ttype:CONST,val:true},
{input:"quad",tag:"mo",output:"\u00A0\u00A0",tex:null,ttype:CONST},
{input:"qquad",tag:"mo",output:"\u00A0\u00A0\u00A0\u00A0",tex:null,ttype:CONST},
{input:"cdots",tag:"mo",output:"\u22EF",tex:null,ttype:CONST},
{input:"vdots",tag:"mo",output:"\u22EE",tex:null,ttype:CONST},
{input:"ddots",tag:"mo",output:"\u22F1",tex:null,ttype:CONST},
{input:"diamond",tag:"mo",output:"\u22C4",tex:null,ttype:CONST},
{input:"Lap",tag:"mo",output:"\u2112",tex:"mathscr{L}",ttype:CONST},
{input:"square",tag:"mo",output:"\u22C4",tex:"boxempty",ttype:CONST},
{input:"|__",tag:"mo",output:"\u230A",tex:"lfloor",ttype:CONST},
{input:"__|",tag:"mo",output:"\u230B",tex:"rfloor",ttype:CONST},
{input:"|~",tag:"mo",output:"\u2308",tex:"lceil",ttype:CONST},
{input:"lceiling",tag:"mo",output:"|~",tex:null,ttype:DEFINITION},
{input:"~|",tag:"mo",output:"\u2309",tex:"rceil",ttype:CONST},
{input:"rceiling",tag:"mo",output:"~|",tex:null,ttype:DEFINITION},
{input:"CC",tag:"mo",output:"\u2102",tex:"mathbb{C}",ttype:CONST,notexcopy:true},
{input:"NN",tag:"mo",output:"\u2115",tex:"mathbb{N}",ttype:CONST,notexcopy:true},
{input:"QQ",tag:"mo",output:"\u211A",tex:"mathbb{Q}",ttype:CONST,notexcopy:true},
{input:"RR",tag:"mo",output:"\u211D",tex:"mathbb{R}",ttype:CONST,notexcopy:true},
{input:"ZZ",tag:"mo",output:"\u2124",tex:"mathbb{Z}",ttype:CONST,notexcopy:true},
{input:"f",tag:"mi",output:"f",tex:null,ttype:UNARY,func:true,val:true},
{input:"g",tag:"mi",output:"g",tex:null,ttype:UNARY,func:true,val:true},
{input:"''",tag:"mo",output:"''",tex:null,val:true},
{input:"'''",tag:"mo",output:"'''",tex:null,val:true},
{input:"''''",tag:"mo",output:"''''",tex:null,val:true},

{input:"iint",  tag:"mo", output:"\u222C", tex:null, ttype:CONST},
{input:"iiint",  tag:"mo", output:"\u222D", tex:null, ttype:CONST},
{input:"oiint", tag:"mo", output:"\u222F", tex:null, ttype:CONST},
{input:"oiiint", tag:"mo", output:"\u2230", tex:null, ttype:CONST},
{input:"laplace",  tag:"mo", output:"\u0394", tex:null, ttype:CONST},

//standard functions
{input:"lim",  tag:"mo", output:"lim", tex:null, ttype:UNDEROVER},
{input:"sin",  tag:"mo", output:"sin", tex:null, ttype:UNARY, func:true},
{input:"cos",  tag:"mo", output:"cos", tex:null, ttype:UNARY, func:true},
{input:"tan",  tag:"mo", output:"tan", tex:null, ttype:UNARY, func:true},
{input:"sinh", tag:"mo", output:"sinh", tex:null, ttype:UNARY, func:true},
{input:"cosh", tag:"mo", output:"cosh", tex:null, ttype:UNARY, func:true},
{input:"tanh", tag:"mo", output:"tanh", tex:null, ttype:UNARY, func:true},
{input:"cot",  tag:"mo", output:"cot", tex:null, ttype:UNARY, func:true},
{input:"sec",  tag:"mo", output:"sec", tex:null, ttype:UNARY, func:true},
{input:"csc",  tag:"mo", output:"csc", tex:null, ttype:UNARY, func:true},
{input:"arcsin",  tag:"mo", output:"arcsin", tex:null, ttype:UNARY, func:true},
{input:"arccos",  tag:"mo", output:"arccos", tex:null, ttype:UNARY, func:true},
{input:"arctan",  tag:"mo", output:"arctan", tex:null, ttype:UNARY, func:true},
{input:"coth",  tag:"mo", output:"coth", tex:null, ttype:UNARY, func:true},
{input:"sech",  tag:"mo", output:"sech", tex:null, ttype:UNARY, func:true},
{input:"csch",  tag:"mo", output:"csch", tex:null, ttype:UNARY, func:true},
{input:"exp",  tag:"mo", output:"exp", tex:null, ttype:UNARY, func:true},
{input:"sgn",  tag:"mo", output:"sgn", tex:null, ttype:UNARY, func:true},
{input:"log",  tag:"mo", output:"log", tex:null, ttype:UNARY, func:true},
{input:"ln",   tag:"mo", output:"ln",  tex:null, ttype:UNARY, func:true},
{input:"det",  tag:"mo", output:"det", tex:null, ttype:UNARY, func:true},
{input:"dim",  tag:"mo", output:"dim", tex:null, ttype:CONST},
{input:"gcd",  tag:"mo", output:"gcd", tex:null, ttype:UNARY, func:true},
{input:"min",  tag:"mo", output:"min", tex:null, ttype:UNDEROVER},
{input:"max",  tag:"mo", output:"max", tex:null, ttype:UNDEROVER},
{input:"Sup",  tag:"mo", output:"sup", tex:null, ttype:UNDEROVER},
{input:"inf",  tag:"mo", output:"inf", tex:null, ttype:UNDEROVER},

{input:"mod",tag:"mo",output:"mod",tex:"text{mod}",ttype:CONST,notexcopy:true},
{input:"lcm",tag:"mo",output:"lcm",tex:"text{lcm}",ttype:UNARY,func:true,notexcopy:true},
{input:"lub",tag:"mo",output:"lub",tex:null,ttype:CONST},
{input:"glb",tag:"mo",output:"glb",tex:null,ttype:CONST},
{input:"abs",tag:"mo",output:"abs",tex:null,ttype:UNARY,notexcopy:true,rewriteleftright:["|","|"]},
{input:"norm",tag:"mo",output:"norm",tex:null,ttype:UNARY,notexcopy:true,rewriteleftright:["\\|","\\|"]},
{input:"floor",tag:"mo",output:"floor",tex:null,ttype:UNARY,notexcopy:true,rewriteleftright:["\\lfloor","\\rfloor"]},
{input:"ceil",tag:"mo",output:"ceil",tex:null,ttype:UNARY,notexcopy:true,rewriteleftright:["\\lceil","\\rceil"]},


//arrows
{input:"uarr", tag:"mo", output:"\u2191", tex:"uparrow", ttype:CONST},
{input:"darr", tag:"mo", output:"\u2193", tex:"downarrow", ttype:CONST},
{input:"rarr", tag:"mo", output:"\u2192", tex:"rightarrow", ttype:CONST},
{input:"->",   tag:"mo", output:"\u2192", tex:"to", ttype:CONST},
{input:">->",   tag:"mo", output:"\u21A3", tex:"rightarrowtail", ttype:CONST},
{input:"->>",   tag:"mo", output:"\u21A0", tex:"twoheadrightarrow", ttype:CONST},
{input:">->>",   tag:"mo", output:"\u2916", tex:"twoheadrightarrowtail", ttype:CONST},
{input:"|->",  tag:"mo", output:"\u21A6", tex:"mapsto", ttype:CONST},
{input:"larr", tag:"mo", output:"\u2190", tex:"leftarrow", ttype:CONST},
{input:"harr", tag:"mo", output:"\u2194", tex:"leftrightarrow", ttype:CONST},
{input:"rArr", tag:"mo", output:"\u21D2", tex:"Rightarrow", ttype:CONST},
{input:"lArr", tag:"mo", output:"\u21D0", tex:"Leftarrow", ttype:CONST},
{input:"hArr", tag:"mo", output:"\u21D4", tex:"Leftrightarrow", ttype:CONST},
{input:"curvArrLt",tag:"mo",output:"\u21B6",tex:"curvearrowleft",ttype:CONST},
{input:"curvArrRt",tag:"mo",output:"\u21B7",tex:"curvearrowright",ttype:CONST},
{input:"circArrLt",tag:"mo",output:"\u21BA",tex:"circlearrowleft",ttype:CONST},
{input:"circArrRt",tag:"mo",output:"\u21BB",tex:"circlearrowright",ttype:CONST},AMsqrt,AMroot,AMfrac,AMdiv,AMover,AMsub,AMsup,

//commands with argument
{input:"stackrel", tag:"mover", output:"stackrel", tex:null, ttype:BINARY},
{input:"overset", tag:"mover", output:"stackrel", tex:null, ttype:BINARY},
{input:"underset", tag:"munder", output:"stackrel", tex:null, ttype:BINARY},
{input:"hat", tag:"mover", output:"\u005E", tex:null, ttype:UNARY, acc:true},
{input:"bar", tag:"mover", output:"\u00AF", tex:"overline", ttype:UNARY, acc:true},
{input:"vec", tag:"mover", output:"\u2192", tex:null, ttype:UNARY, acc:true},
{input:"tilde",tag:"mover",output:"~",tex:null,ttype:UNARY,acc:true},
{input:"dot", tag:"mover", output:".",      tex:null, ttype:UNARY, acc:true},
{input:"ddot", tag:"mover", output:"..",    tex:null, ttype:UNARY, acc:true},
{input:"ul", tag:"munder", output:"\u0332", tex:"underline", ttype:UNARY, acc:true},
{input:"ubrace", tag:"munder", output:"\u23DF", tex:"underbrace", ttype:UNARYUNDEROVER, acc:true},
{input:"obrace", tag:"mover", output:"\u23DE", tex:"overbrace", ttype:UNARYUNDEROVER, acc:true},
{input:"color", tag:"mstyle", ttype:BINARY},
{input:"cancel", tag:"menclose", output:"cancel", tex:null, ttype:UNARY},
AMtext,AMmbox,AMquote,

{input:"bb",tag:"mstyle",atname:"mathvariant",atval:"bold",output:"bb",tex:"mathbf",ttype:UNARY,notexcopy:true},
{input:"mathbf",tag:"mstyle",atname:"mathvariant",atval:"bold",output:"mathbf",tex:null,ttype:UNARY},
{input:"sf",tag:"mstyle",atname:"mathvariant",atval:"sans-serif",output:"sf",tex:"mathsf",ttype:UNARY,notexcopy:true},
{input:"mathsf",tag:"mstyle",atname:"mathvariant",atval:"sans-serif",output:"mathsf",tex:null,ttype:UNARY},
{input:"bbb",tag:"mstyle",atname:"mathvariant",atval:"double-struck",output:"bbb",tex:"mathbb",ttype:UNARY,notexcopy:true},
{input:"mathbb",tag:"mstyle",atname:"mathvariant",atval:"double-struck",output:"mathbb",tex:null,ttype:UNARY},
{input:"cc",tag:"mstyle",atname:"mathvariant",atval:"script",output:"cc",tex:"mathcal",ttype:UNARY,notexcopy:true},
{input:"mathcal",tag:"mstyle",atname:"mathvariant",atval:"script",output:"mathcal",tex:null,ttype:UNARY},
{input:"tt",tag:"mstyle",atname:"mathvariant",atval:"monospace",output:"tt",tex:"mathtt",ttype:UNARY,notexcopy:true},
{input:"mathtt",tag:"mstyle",atname:"mathvariant",atval:"monospace",output:"mathtt",tex:null,ttype:UNARY},
{input:"fr",tag:"mstyle",atname:"mathvariant",atval:"fraktur",output:"fr",tex:"mathfrak",ttype:UNARY,notexcopy:true},
{input:"mathfrak",tag:"mstyle",atname:"mathvariant",atval:"fraktur",output:"mathfrak",tex:null,ttype:UNARY},

{input:"bm", tag:"mstyle", atname:"mathvariant", atval:"bold-italic", output:"bm", tex:null, ttype:UNARY},
{input:"rm", tag:"mstyle", atname:"mathvariant", atval:"serif", output:"rm", tex:null, ttype:UNARY},
];

})();

// asciimath-katex.js

var texstring;
(AMTEX = function() {

var mathcolor = "";
var translateOnLoad = true;
var showasciiformulaonhover = false;
var decimalsign = ".";
var AMdelimiter1 = "`", AMescape1 = "\\\\`";
var AMusedelimiter2 = true;
var AMdelimiter2 = "qq", AMescape2="\\\\\\qq", AMdelimiter2regexp = "\\qq";

var mIdCounter = 0;
var displaystyle = true;

// token types
var CONST=0,UNARY=1,BINARY=2,INFIX=3,LEFTBRACKET=4,RIGHTBRACKET=5,SPACE=6,UNDEROVER=7,DEFINITION=8,LEFTRIGHT=9,TEXT=10;

function compareNames(s1,s2){
	if(s1.input>s2.input) return 1;
	else return-1;
}

var AMnames=[];

function refreshSymbols() {
	AM.symbols.sort(compareNames);
	var symlen = AM.symbols.length;
	for(var i=0; i<symlen; i++)
		AMnames[i]=AM.symbols[i].input;
}

function AMinitSymbols(){
	var texsymbols=[];
	var symlen = AM.symbols.length;
	for(var i=0; i<symlen; i++) {
		if(AM.symbols[i].tex
			//!tex
			&& !(typeof AM.symbols[i].notexcopy=="boolean"
				&& AM.symbols[i].notexcopy)
		){
			texsymbols.push({
				input:AM.symbols[i].tex,
				tag:AM.symbols[i].tag,
				output:AM.symbols[i].output,
				ttype:AM.symbols[i].ttype,
				acc:(AM.symbols[i].acc||false)
			});
		}
	}
	AM.symbols=AM.symbols.concat(texsymbols);
	refreshSymbols();
}

function newcommand(oldstr,newstr) {
	AM.symbols.push([{input:oldstr,tag:"mo",output:newstr,tex:null,ttype:DEFINITION}]);
}

function AMremoveCharsAndBlanks(str,n){
	var st;
	if(str.charAt(n)=="\\"&&str.charAt(n+1)!="\\"&&str.charAt(n+1)!=" ")
		st=str.slice(n+1);
	else st=str.slice(n);
	for(var i=0;i<st.length&&st.charCodeAt(i)<=32;i=i+1);
	return st.slice(i);
}

function AMposition(arr,str,n){
	if(n==0){
		var h,m; n=-1; h=arr.length;
		while(n+1<h){
			m=(n+h)>>1;
			if(arr[m]<str)n=m;
			else h=m;
		}
		return h;
	}else
		for(var i=n;i<arr.length&&arr[i]<str;i++);
	return i;
}

function AMgetSymbol(str){var k=0;var j=0;var mk;var st;var tagst;var match="";var more=true;for(var i=1;i<=str.length&&more;i++){st=str.slice(0,i);j=k;k=AMposition(AMnames,st,j);if(k<AMnames.length&&str.slice(0,AMnames[k].length)==AMnames[k]){match=AMnames[k];mk=k;i=match.length;}
more=k<AMnames.length&&str.slice(0,AMnames[k].length)>=AMnames[k];}
AMpreviousSymbol=AMcurrentSymbol;if(match!=""){AMcurrentSymbol=AM.symbols[mk].ttype;return AM.symbols[mk];}
AMcurrentSymbol=CONST;k=1;st=str.slice(0,1);var integ=true;while("0"<=st&&st<="9"&&k<=str.length){st=str.slice(k,k+1);k++;}
if(st==decimalsign){st=str.slice(k,k+1);if("0"<=st&&st<="9"){integ=false;k++;while("0"<=st&&st<="9"&&k<=str.length){st=str.slice(k,k+1);k++;}}}
if((integ&&k>1)||k>2){st=str.slice(0,k-1);tagst="mn";}else{k=2;st=str.slice(0,1);tagst=(("A">st||st>"Z")&&("a">st||st>"z")?"mo":"mi");}
//!tex
if(st=="-"&&AMpreviousSymbol==INFIX){AMcurrentSymbol=INFIX;
	return{input:st,tag:tagst,output:st,ttype:UNARY,func:true,val:true};
}
return{input:st,tag:tagst,output:st,ttype:CONST,val:true};
}

//!tex
function AMTremoveBrackets(node) {
	var st;
	if (node.charAt(0) == '{' && node.charAt(node.length-1) == '}') {
		var leftchop = 0;
		st = node.substr(1,5);
		if (st == '\\left'){
			st = node.charAt(6);
			if (st == "(" || st == "[" || st == "{"){
				leftchop = 7;
			} else {
				st = node.substr(6,7);
				if (st=='\\lbrace') {
					leftchop = 13;
				}
			}
		} else {
			st = node.charAt(1);
			if (st == "(" || st == "[") {
				leftchop = 2;
			}
		}
		if (leftchop > 0) {
			st = node.substr(node.length-8);
			if (st=="\\right)}" || st=="\\right]}" || st=='\\right.}'){
				node = '{' + node.substr(leftchop);
				node = node.substr(0,node.length-8) + '}';
			} else if (st=='\\rbrace}') {
				node='{'+node.substr(leftchop);
				node=node.substr(0,node.length-14)+'}';
			}
		}
	}
	return node;
}

var AMnestingDepth,AMpreviousSymbol,AMcurrentSymbol;

function AMTgetTeXsymbol(symb){
	if(typeof symb.val=="boolean"&&symb.val){
		pre='';
	}else{
		pre='\\';
	}
	if(symb.tex==null){
		return(pre+symb.input);
	}else{
		return(pre+symb.tex);
	}
}

function AMTgetTeXbracket(symb){
	if(symb.tex==null){
		return(symb.input);
	}else{
		return('\\'+symb.tex);
	}
}

function AMTparseSexpr(str){var symbol,node,result,i,st,newFrag='';str=AMremoveCharsAndBlanks(str,0);symbol=AMgetSymbol(str);if(symbol==null||symbol.ttype==RIGHTBRACKET&&AMnestingDepth>0){return[null,str];}
if(symbol.ttype==DEFINITION){str=symbol.output+AMremoveCharsAndBlanks(str,symbol.input.length);symbol=AMgetSymbol(str);}
switch(symbol.ttype){case UNDEROVER:case CONST:str=AMremoveCharsAndBlanks(str,symbol.input.length);var texsymbol=AMTgetTeXsymbol(symbol);if(texsymbol.charAt(0)=="\\"||symbol.tag=="mo")return[texsymbol,str];else return['{'+texsymbol+'}',str];case LEFTBRACKET:AMnestingDepth++;str=AMremoveCharsAndBlanks(str,symbol.input.length);result=AMTparseExpr(str,true);AMnestingDepth--;if(result[0].substr(0,6)=="\\right"){if(result[0].substr(0,7)=="\\right."){result[0]=result[0].substr(7);}else{result[0]=result[0].substr(6);}
if(typeof symbol.invisible=="boolean"&&symbol.invisible)
node='{'+result[0]+'}';else{node='{'+AMTgetTeXbracket(symbol)+result[0]+'}';}}else{if(typeof symbol.invisible=="boolean"&&symbol.invisible)
node='{\\left.'+result[0]+'}';else{node='{\\left'+AMTgetTeXbracket(symbol)+result[0]+'}';}}
return[node,result[1]];case TEXT:if(symbol!=AM.quote)str=AMremoveCharsAndBlanks(str,symbol.input.length);if(str.charAt(0)=="{")i=str.indexOf("}");else if(str.charAt(0)=="(")i=str.indexOf(")");else if(str.charAt(0)=="[")i=str.indexOf("]");else if(symbol==AM.quote)i=str.slice(1).indexOf("\"")+1;else i=0;if(i==-1)i=str.length;st=str.slice(1,i);if(st.charAt(0)==" "){newFrag='\\ ';}
newFrag+='\\text{'+st+'}';if(st.charAt(st.length-1)==" "){newFrag+='\\ ';}
str=AMremoveCharsAndBlanks(str,i+1);return[newFrag,str];case UNARY:str=AMremoveCharsAndBlanks(str,symbol.input.length);result=AMTparseSexpr(str);if(result[0]==null)return['{'+AMTgetTeXsymbol(symbol)+'}',str];if(typeof symbol.func=="boolean"&&symbol.func){st=str.charAt(0);if(st=="^"||st=="_"||st=="/"||st=="|"||st==","||(symbol.input.length==1&&symbol.input.match(/\w/)&&st!="(")){return['{'+AMTgetTeXsymbol(symbol)+'}',str];}else{node=' '+AMTgetTeXsymbol(symbol)+'{'+result[0]+'}';return[node,result[1]];}}
result[0]=AMTremoveBrackets(result[0]);if(symbol.input=="sqrt"){return['\\sqrt{'+result[0]+'}',result[1]];}else if(symbol.input=="cancel"){return['\\cancel{'+result[0]+'}',result[1]];}else if(typeof symbol.rewriteleftright!="undefined"){return['{\\left'+symbol.rewriteleftright[0]+result[0]+'\\right'+symbol.rewriteleftright[1]+'}',result[1]];}else if(typeof symbol.acc=="boolean"&&symbol.acc){return[AMTgetTeXsymbol(symbol)+'{'+result[0]+'}',result[1]];}else{return['{'+AMTgetTeXsymbol(symbol)+'{'+result[0]+'}}',result[1]];}
case BINARY:str=AMremoveCharsAndBlanks(str,symbol.input.length);result=AMTparseSexpr(str);if(result[0]==null)return['{'+AMTgetTeXsymbol(symbol)+'}',str];result[0]=AMTremoveBrackets(result[0]);var result2=AMTparseSexpr(result[1]);if(result2[0]==null)return['{'+AMTgetTeXsymbol(symbol)+'}',str];result2[0]=AMTremoveBrackets(result2[0]);if(symbol.input=="color"){newFrag='{\\color{'+result[0].replace(/[\{\}]/g,'')+'}'+result2[0]+'}';}
if(symbol.input=="root"||symbol.input=="stackrel"){if(symbol.input=="root"){newFrag='{\\sqrt['+result[0]+']{'+result2[0]+'}}';}else{newFrag='{'+AMTgetTeXsymbol(symbol)+'{'+result[0]+'}{'+result2[0]+'}}';}}
if(symbol.input=="frac"){newFrag='{\\frac{'+result[0]+'}{'+result2[0]+'}}';}
return[newFrag,result2[1]];case INFIX:str=AMremoveCharsAndBlanks(str,symbol.input.length);return[symbol.output,str];case SPACE:str=AMremoveCharsAndBlanks(str,symbol.input.length);return['{\\quad\\text{'+symbol.input+'}\\quad}',str];case LEFTRIGHT:AMnestingDepth++;str=AMremoveCharsAndBlanks(str,symbol.input.length);result=AMTparseExpr(str,false);AMnestingDepth--;var st="";st=result[0].charAt(result[0].length-1);if(st=="|"){node='{\\left|'+result[0]+'}';return[node,result[1]];}else{node='{|}';return[node,str];}
default:str=AMremoveCharsAndBlanks(str,symbol.input.length);return['{'+AMTgetTeXsymbol(symbol)+'}',str];}}

function AMTparseIexpr(str){var symbol,sym1,sym2,node,result;str=AMremoveCharsAndBlanks(str,0);sym1=AMgetSymbol(str);result=AMTparseSexpr(str);node=result[0];str=result[1];symbol=AMgetSymbol(str);if(symbol.ttype==INFIX&&symbol.input!="/"){str=AMremoveCharsAndBlanks(str,symbol.input.length);result=AMTparseSexpr(str);if(result[0]==null)
result[0]='{}';else result[0]=AMTremoveBrackets(result[0]);str=result[1];if(symbol.input=="_"){sym2=AMgetSymbol(str);if(sym2.input=="^"){str=AMremoveCharsAndBlanks(str,sym2.input.length);var res2=AMTparseSexpr(str);res2[0]=AMTremoveBrackets(res2[0]);str=res2[1];node='{'+node;node+='_{'+result[0]+'}';node+='^{'+res2[0]+'}';node+='}';}else{node+='_{'+result[0]+'}';}}else{numLBraces=result[0].split("{").length;numRBraces=result[0].split("}").length;if(numLBraces==2&&numRBraces==2){node=node+'^'+result[0];}else{node=node+'^{'+result[0]+'}';}}
if(typeof sym1.func!='undefined'&&sym1.func){sym2=AMgetSymbol(str);if(sym2.ttype!=INFIX&&sym2.ttype!=RIGHTBRACKET){result=AMTparseIexpr(str);node='{'+node+result[0]+'}';str=result[1];}}}
return[node,str];}

function AMTparseExpr(str,rightbracket){var strRem=str;var symbol,node,result,i,nodeList=[],newFrag='';var addedright=false;do{str=AMremoveCharsAndBlanks(str,0);result=AMTparseIexpr(str);node=result[0];str=result[1];symbol=AMgetSymbol(str);if(symbol.ttype==INFIX&&symbol.input=="/"){str=AMremoveCharsAndBlanks(str,symbol.input.length);result=AMTparseIexpr(str);if(result[0]==null)
result[0]='{}';else result[0]=AMTremoveBrackets(result[0]);str=result[1];node=AMTremoveBrackets(node);numLBraces=node.split("{").length-1;numRBraces=node.split("}").length-1;if(numLBraces==1&&numRBraces==1&&node.indexOf('\\text')<0){node='\\frac'+node;}else{node='\\frac'+'{'+node+'}';}
numLBraces=result[0].split("{").length-1;numRBraces=result[0].split("}").length-1;node+='{'+result[0]+'}';newFrag+=node;symbol=AMgetSymbol(str);}else if(node!=undefined)newFrag+=node;}while((symbol.ttype!=RIGHTBRACKET&&(symbol.ttype!=LEFTRIGHT||rightbracket)||AMnestingDepth==0)&&symbol!=null&&symbol.output!="");if(symbol.ttype==RIGHTBRACKET||symbol.ttype==LEFTRIGHT){var len=newFrag.length;if(len>2&&newFrag.charAt(0)=='{'&&newFrag.indexOf(',')>0){var right=newFrag.charAt(len-2);if(right==')'||right==']'){var left=newFrag.charAt(6);if((left=='('&&right==')'&&symbol.output!='}')||(left=='['&&right==']')){var mxout='\\begin{matrix}';var pos=new Array();pos.push(0);var matrix=true;var mxnestingd=0;var subpos=[];subpos[0]=[0];var lastsubposstart=0;var mxanynestingd=0;for(i=1;i<len-1;i++){if(newFrag.charAt(i)==left)mxnestingd++;if(newFrag.charAt(i)==right){mxnestingd--;if(mxnestingd==0&&newFrag.charAt(i+2)==','&&newFrag.charAt(i+3)=='{'){pos.push(i+2);lastsubposstart=i+2;subpos[lastsubposstart]=[i+2];}}
if(newFrag.charAt(i)=='['||newFrag.charAt(i)=='('||newFrag.charAt(i)=='{'){mxanynestingd++;}
if(newFrag.charAt(i)==']'||newFrag.charAt(i)==')'||newFrag.charAt(i)=='}'){mxanynestingd--;}
if(newFrag.charAt(i)==','&&mxanynestingd==1){subpos[lastsubposstart].push(i);}}
pos.push(len);var lastmxsubcnt=-1;if(mxnestingd==0&&pos.length>0){for(i=0;i<pos.length-1;i++){if(i>0)mxout+='\\\\';if(i==0){if(subpos[pos[i]].length==1){var subarr=[newFrag.substr(pos[i]+7,pos[i+1]-pos[i]-15)];}else{var subarr=[newFrag.substring(pos[i]+7,subpos[pos[i]][1])];for(var j=2;j<subpos[pos[i]].length;j++){subarr.push(newFrag.substring(subpos[pos[i]][j-1]+1,subpos[pos[i]][j]));}
subarr.push(newFrag.substring(subpos[pos[i]][subpos[pos[i]].length-1]+1,pos[i+1]-8));}}else{if(subpos[pos[i]].length==1){var subarr=[newFrag.substr(pos[i]+8,pos[i+1]-pos[i]-16)];}else{var subarr=[newFrag.substring(pos[i]+8,subpos[pos[i]][1])];for(var j=2;j<subpos[pos[i]].length;j++){subarr.push(newFrag.substring(subpos[pos[i]][j-1]+1,subpos[pos[i]][j]));}
subarr.push(newFrag.substring(subpos[pos[i]][subpos[pos[i]].length-1]+1,pos[i+1]-8));}}
if(lastmxsubcnt>0&&subarr.length!=lastmxsubcnt){matrix=false;}else if(lastmxsubcnt==-1){lastmxsubcnt=subarr.length;}
mxout+=subarr.join('&');}}
mxout+='\\end{matrix}';newFrag=mxout;}}}
str=AMremoveCharsAndBlanks(str,symbol.input.length);if(typeof symbol.invisible!="boolean"||!symbol.invisible){node='\\right'+AMTgetTeXbracket(symbol);newFrag+=node;addedright=true;}else{newFrag+='\\right.';addedright=true;}}
if(AMnestingDepth>0&&!addedright){newFrag+='\\right.';}
return[newFrag,str];}

function AMTparseAMtoTeX(str) {
	AMnestingDepth=0;
	str=str.replace(/(&nbsp;|\u00a0|&#160;)/g,"");
	str=str.replace(/&gt;/g,">");
	str=str.replace(/&lt;/g,"<");
	if(str.match(/\S/)==null){
		return "";
	}
	return AMTparseExpr(str.replace(/^\s+/g,""),false)[0];
}

function AMparseMath(str) {
	str=str.replace(/(&nbsp;|\u00a0|&#160;)/g,"");
	str=str.replace(/&gt;/g,">");
	str=str.replace(/&lt;/g,"<");
	str=str.replace(/×/g,"\\times");
	str=str.replace(/−/g,"-");
	str=str.replace(/&Omega/g,"\\Omega");
	str=str.replace(/\/\//g,"text(/)");
	str=str.replace(/’/g,"text(')");
	str=str.replace(/”/g,'text(")');
	str=str.replace(/·/g,"\\cdot");
	if (str.match(/\S/)==null) {
		return document.createTextNode(" ");
	}
	texstring=AMTparseAMtoTeX(str);
	if (typeof mathbg!="undefined" && mathbg=='dark'){
		texstring="\\reverse "+texstring;
	}
	if(mathcolor!=""){
		texstring="\\"+mathcolor+texstring;
	}
	if(displaystyle){
		texstring="\\displaystyle"+texstring;
	}else{
		texstring="\\textstyle"+texstring;
	}
	texstring=texstring.replace('$','\\$');
	texstring=texstring.replace(/%/g,'\\%');
	texstring=texstring.replace(/∠/g,'\\angle');
	texstring=texstring.replace(/Φ/g,"\\Phi");
	texstring=texstring.replace(/θ/g,"\\theta");
	texstring=texstring.replace(/Δ/g,"\\Delta");
	texstring=texstring.replace(/α/g,"\\alpha");
	texstring=texstring.replace(/β/g,"\\beta");
	texstring=texstring.replace(/ω/g,"\\omega");
	texstring=texstring.replace(/μ/g,"\\mu");
	texstring=texstring.replace(/Ω/g,"\\Omega");
	texstring=texstring.replace(/δ/g,"\\delta");
	texstring=texstring.replace(/γ/g,"\\gamma");
	texstring=texstring.replace(/σ/g,"\\sigma");
	texstring=texstring.replace(/π/g,"\\pi");
	texstring=texstring.replace(/≥/g,"\\ge");
	texstring=texstring.replace(/≤/g,"\\le");
	texstring=texstring.replace(/≠/g,"\\ne");
	texstring=texstring.replace(/≡/g,"\\equiv");
	texstring=texstring.replace(/≈/g,"\\approx");
	texstring=texstring.replace(/→/g,"\\rightarrow");
	texstring=texstring.replace(/÷/g,"\\div");
	texstring=texstring.replace(/±/g,"\\pm");
	texstring=texstring.replace(/°/g,"^{\\circ}");
	texstring=texstring.replace(/∞/g,"\\infty");
	texstring=texstring.replace(/ma\\genta/g,"magenta");
	texstring=texstring.replace(/{f}{b}\\otimes/g,"\\fbox");
	var node=document.createElement("span");
	node.id="mathId"+mIdCounter;
	node.innerHTML=texstring;
	try{
		if (str.indexOf('\\begin{cases}')>-1) {
			katex.render(str,node);
		} else {
			katex.render(texstring,node);
		}
	} catch(err) {
		node.className="katexErr";
		if (typeof MathJax!=='undefined') {
			node.innerHTML="`"+str+"`";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub,"mathId"+mIdCounter]);
		} else {
			//console.log(err);
		}
	}
	mIdCounter++;
	return node;
}

function AMstrarr2docFrag(arr) {
	var newFrag=document.createDocumentFragment();
	var expr=false;
	for(var i=0;i<arr.length;i++){
		if(expr){
			newFrag.appendChild(AMparseMath(arr[i]));
		}else{
			newFrag.appendChild(
				document.createElement("span").appendChild(
					document.createTextNode(arr[i])
				)
			);
		}
		expr=!expr;
	}
	return newFrag;
}

function AMprocessNodeR(n){
	var mtch,str,arr,frg,i;
	if(n.childNodes.length==0){
		if((n.nodeType!=8)
			&& n.nodeName.toLowerCase()!="script"
			&& n.parentNode.nodeName.toLowerCase()!="script"
			&& n.parentNode.nodeName.toLowerCase()!="em"
			&& n.parentNode.nodeName.toLowerCase()!="i"
			&& n.parentNode.nodeName.toLowerCase()!="button"
			&& n.parentNode.nodeName.toLowerCase()!="form"
			&& n.parentNode.className.indexOf("noKatex")==-1
			&& n.parentNode.className.indexOf("adinText")==-1
			&& (n.nodeValue!=null
				&& n.nodeValue.replace(/(\r\n\t|\n|\r\t)/gm,"")
				.replace(/\s+/g,"").length>0
			) && n.id!="footer"
		) {
			str=n.nodeValue;
			if(!(str==null)&&str.length>0){
				str=str.replace(/\r\n\r\n/g,"\n\n");
				str=str.replace(/\x20+/g," ");
				str=str.replace(/\s*\r\n/g," ");
				mtch=false;
				if(AMusedelimiter2){
					str=str.replace(
						new RegExp(AMescape2,"g"),
						function(st){mtch=true;return"AMescape2"}
					);
				}
				str=str.replace(
					new RegExp(AMescape1,"g"),
					function(st){mtch=true;return"AMescape1"}
				);
				if(AMusedelimiter2)
					str=str.replace(
						new RegExp(AMdelimiter2regexp,"g"),
						AMdelimiter1
					);
				arr=str.split(AMdelimiter1);
				for(i=0;i<arr.length;i++){
					if(AMusedelimiter2){
						arr[i]=arr[i].replace(/AMescape2/g,AMdelimiter2)
							.replace(/AMescape1/g,AMdelimiter1);
					}else{
						arr[i]=arr[i].replace(/AMescape1/g,AMdelimiter1);
					}
				}
				if(arr.length>1||mtch){
					frg=AMstrarr2docFrag(arr,n.nodeType==8);
					var len=frg.childNodes.length;
					n.parentNode.replaceChild(frg,n);
					return len-1;
				}
			}
		}else{
			return 0;
		}
	}else if(n.nodeName!="math"&&n.nodeName.toLowerCase()!="svg"){
		if (n.nodeName.toLowerCase() != "script"
			&& !(n.parentNode.classList
				&& (n.classList.contains("displayNone")
					|| n.classList.contains("ariaHidden")
					|| n.classList.contains("katex")
					|| n.parentNode.classList.contains("sprite")
				)
			)
		) {
			var eleTop=n.getBoundingClientRect().top;
			for(i=0;i<n.childNodes.length;i++){
				if ((n.childNodes[i].nodeType==3
						&& n.childNodes[i].nodeValue!=null
						&& n.childNodes[i].nodeValue.replace(/(\r\n\t|\n|\r\t)/gm,"").replace(/\s+/g,"").length==0
					) || (n.childNodes[i].classList
						&& (n.childNodes[i].classList.contains("sprite")
							|| n.childNodes[i].classList.contains("showHideButt")
							|| n.childNodes[i].classList.contains("noKatex")
							|| n.childNodes[i].classList.contains("displayNone")
							|| n.childNodes[i].classList.contains("katex")
							|| n.childNodes[i].classList.contains("ariaHidden")
						)
					) || n.childNodes[i].nodeName.toLowerCase()=="i"
					|| n.childNodes[i].nodeName.toLowerCase()=="em"
					|| n.childNodes[i].nodeName.toLowerCase()=="strong"
					|| n.childNodes[i].nodeName.toLowerCase()=="b"
					|| n.childNodes[i].nodeName.toLowerCase()=="script"
					|| n.childNodes[i].nodeName.toLowerCase()=="button"
					|| n.childNodes[i].nodeName.toLowerCase()=="svg"
					|| n.childNodes[i].nodeName.toLowerCase()=="pre"
					|| n.childNodes[i].nodeName.toLowerCase()=="code"
					|| n.childNodes[i].nodeName.toLowerCase()=="textarea"
					|| (n.childNodes[i].nodeName.toLowerCase()=="span"
						&& n.childNodes[i].id.indexOf("mathId")>-1)
					|| n.childNodes[i].nodeType==8
					|| eleTop>window.innerHeight+1000
				) {} else {
					i+=AMprocessNodeR(n.childNodes[i]);
				}
			}
		}
	}
	return 0;
}

function AMprocessNode(n, linebreaks, spanclassAM) {
  var frag,st;
  if (spanclassAM!=null) {
    frag = document.getElementsByTagName("span")
    for (var i=0;i<frag.length;i++)
      if (frag[i].className == "AM") 
        AMprocessNodeR(frag[i],linebreaks,false);
  } else {
    try {
      st = n.innerHTML; // look for AMdelimiter on page
    } catch(err) {}
//alert(st)
    if (st==null || /amath\b|\\begin{a?math}/i.test(st) ||
      st.indexOf(AMdelimiter1+" ")!=-1 || st.slice(-1)==AMdelimiter1 ||
      st.indexOf(AMdelimiter1+"<")!=-1 || st.indexOf(AMdelimiter1+"\n")!=-1) {
      AMprocessNodeR(n,linebreaks,false);
    }
  }
}

var AMtranslated=false;

function translate(spanclassAM) {
	if (!AMtranslated) { // run this only once
		AMtranslated = true;
		AMprocessNode(document.body, false, spanclassAM);
	}
}

function generic(){
  if(!AMinitSymbols()) return;
  if (translateOnLoad) {
      translate();
  }
};

/*
//setup onload function
if(typeof window.addEventListener != 'undefined'){
  //.. gecko, safari, konqueror and standard
  window.addEventListener('load', generic, false);
}
else if(typeof document.addEventListener != 'undefined'){
  //.. opera 7
  document.addEventListener('load', generic, false);
}
else if(typeof window.attachEvent != 'undefined'){
  //.. win/ie
  window.attachEvent('onload', generic);
}else{
  //.. mac/ie5 and anything else that gets this far
  //if there's an existing onload function
  if(typeof window.onload == 'function'){
    //store it
    var existing = onload;
    //add new onload handler
    window.onload = function(){
      //call existing onload function
      existing();
      //call generic onload function
      generic();
    };
  }else{
    window.onload = generic;
  }
}
*/

AMinitSymbols();
translate();

// expose some functions to outside
AM.AMprocessNode = AMprocessNode;
AM.AMparseMath = AMparseMath;
AM.AMTparseAMtoTeX = AMTparseAMtoTeX;

})();
