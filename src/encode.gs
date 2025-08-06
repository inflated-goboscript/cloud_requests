func _sa_encode(content) {
    local i = 1;
    local ret = "";
    repeat length $content {
        # mapping
        ret &= _sa_encode_chr($content[i]);
        i++;
    }
    return ret;
}

# The reason why this is so weirdly coded is because the scratchattach mapping was badly picked.
func _sa_encode_chr(c) {
    local c_idx = findchar(ASCII_LOWERCASE, $c);
    if c_idx == 0 {
        # not a letter
        if $c in "123456789" {
            return $c + 9;
        } elif $c == "0" {
            return 19;
        } elif $c == " " {
            return 20;
        } else {
            return 72 + findchar("*/.,!\"§$%_-(´)`?n@#~;:+&|^'", $c);
        }
    } else {
        # a goes to 22, A goes to 23
        return c_idx * 2 + 19 + chr_isupper($c);
    }
}
