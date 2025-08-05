list sa_old_cloud_values;
list sa_parsed_responses;
list sa_response;

var sa_request_status = "";
var sa_request_id = "";
var sa_request = "";

onflag {
    SA_CLOUD_INIT;
}

proc SA_CLOUD_INIT {
    # to load in a global variable without altering its value
    SA_CLOUD_STAGE_INITED = SA_CLOUD_STAGE_INITED;
    if SA_CLOUD_STAGE_INITED {
        log "Thanks for using cloud requests!";
    } else {
        error "SA CLOUD REQUESTS: Cloud vars are not inited: add `%include inflator/cloud_requests/stage` to `stage.gs`";
        say "see console";
        breakpoint;
    }
}

onflag {
    sa_message_receiver;
}

nowarp proc sa_message_receiver {
    sa_init;
    forever {
        sa_check;
    }
}

proc sa_init {
    delete sa_old_cloud_values;
    add FROM_HOST_1 to sa_old_cloud_values;
    add FROM_HOST_2 to sa_old_cloud_values;
    add FROM_HOST_3 to sa_old_cloud_values;
    add FROM_HOST_4 to sa_old_cloud_values;
    add FROM_HOST_5 to sa_old_cloud_values;
    add FROM_HOST_6 to sa_old_cloud_values;
    add FROM_HOST_7 to sa_old_cloud_values;
    add FROM_HOST_8 to sa_old_cloud_values;
    add FROM_HOST_9 to sa_old_cloud_values;
    
    delete sa_parsed_responses;
}

proc sa_check {

}

proc send_request content {
    delete response;
    sa_request = $content;

    local encoded = _sa_encode(sa_request);
}

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
