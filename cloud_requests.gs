# This is certainly slower than the original sb3 implementation, but it should be more readable and uses libraries.

list sa_old_cloud_values;
list sa_parsed_responses;
list sa_response;
list sa_to_send;

var sa_request_status = "";
var sa_request_id = "";
var sa_request = "";
var sa_timeout_after = 10;

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

nowarp proc send_request content {
    delete sa_response;
    delete sa_to_send;
    sa_request = $content;

    local encoded = _sa_encode($content);

    # nowarp proc _request data $data, data = encoded:

    local raw_output = "";
    sa_request_status = "LOADING";

    # request id 100000 is used by the backend for sending data to the frontend without a priorly received request
    sa_request_id = "." & random(10001, 99999) & 0;

    if length encoded < 245 {
        # for short strings, only 1 request is needed.
        TO_HOST = encoded & sa_request_id;
    } else {
        # prepare send of data
        # split into strings of length 245 and output into sa_to_send list
        local i = 1;
        local partial_request = "";
        repeat length encoded {
            partial_request &= encoded[i];

            if i % 245 == 0 {
                add partial_request to sa_to_send;
                partial_request = "";
            }

            i++;
        }
        add partial_request to sa_to_send;

        # Actually send the data
        local i = 1;
        repeat length sa_to_send - 1 {
            TO_HOST = "-" & sa_to_send[i] & sa_request_id;
            i++;
            wait 0.1;
        }
        TO_HOST = sa_to_send[i] & sa_request_id;
    }

    # Receive a response
    local start_time = SECONDS_SINCE_2000();

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
