costumes "blank.svg";

%include inflator/assert
%include inflator/char
%include inflator/string
%include inflator/time
%include inflator/cloud_requests

list testers = ["None",
    "None",
    "None",
    "None",
    "None",
    "None",
    "None",
    "None",
    "None",
    "None",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    " ",
    "a",
    "A",
    "b",
    "B",
    "c",
    "C",
    "d",
    "D",
    "e",
    "E",
    "f",
    "F",
    "g",
    "G",
    "h",
    "H",
    "i",
    "I",
    "j",
    "J",
    "k",
    "K",
    "l",
    "L",
    "m",
    "M",
    "n",
    "N",
    "o",
    "O",
    "p",
    "P",
    "q",
    "Q",
    "r",
    "R",
    "s",
    "S",
    "t",
    "T",
    "u",
    "U",
    "v",
    "V",
    "w",
    "W",
    "x",
    "X",
    "y",
    "Y",
    "z",
    "Z",
    "*",
    "/",
    ".",
    ",",
    "!",
    "\"",
    "§",
    "$",
    "%",
    "_",
    "-",
    "(",
    "´",
    ")",
    "`",
    "?",
    "new line",
    "@",
    "#",
    "~",
    ";",
    ":",
    "+",
    "&",
    "|",
    "^",
    "'"
];

onflag {main;}
nowarp proc main {
    send_request "ping";
    _sa_decode "663421294546303940565427643949473843694045324931582736452348324370686932375743517065684423" &
               "673856692566547069532672486423456071432152294242653455604153545926723428225161412832682864" &
               "3138393458442746284566363634613155665562434361506550595533284245";
    assert_eq sa_response, "WGaemMEjJRQdVjonIlyJmFofSdHmbNFlYXyFislpYwXLbxIRycWQYyqCZNVbmTzlaPeKKwGrTkqQtCZGDApukDFXDVfIjGSLdMDmWHHGufrWrUlluOwOtrgDKm";
}

onkey "space" {
    send_request "ping&" & TIME();
}

onkey "1" {
    send_request "return_self&" & repstr(ASCII_LETTERS, 5);
}
