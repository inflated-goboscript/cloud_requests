
# inverse of _sa_encode
proc _sa_decode ret {
    delete sa_response;
    
    local content = "";
    local i = 1;

    repeat length $ret / 2 {
        part = $ret[i] & $ret[i + 1];
        if part == 88 {
            add content to sa_response;
            content = "";
        } else {
            # →→→→→                                                                                      newline ↓
            content &= ".........1234567890 aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ*/.,!\"§$%_-(´)`? @#~;:+&|^'"[part];
        }
        
        i += 2;
    }
    if content > "" {
        add content to sa_response;
    }
}
