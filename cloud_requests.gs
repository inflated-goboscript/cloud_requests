# This is certainly slower than the original sb3 implementation, but it should be more readable and uses libraries.

# submodule includes are at the bottom
%include inflator/time
%include inflator/char
%include inflator/string

# we need to add '=' to the start of each old cloud val to force comparison by string rather than by float, which has inaccuracies in the decimal portion
list sa_old_cloud_values;
list sa_parsed_responses;
list sa_on_send_parsed_responses;
list sa_response;
list sa_to_send;

var sa_request_status = "";
var sa_request_id = "";
var sa_request = "";
var sa_timeout_after = 10;
var _sa_receiving_send_message = false;

enum SAStatuses {
    loading = "LOADING",
    done = "DONE",
    timeout = "TIMEOUT",
    receiving = "RECEIVING",
    receiving_message = "RECEIVING MESSAGE",
    sent_from_server = "SENT FROM SERVER"
}

proc SA_CLOUD_INIT {
    # to load in a global variable without altering its value
    SA_CLOUD_STAGE_INITED = SA_CLOUD_STAGE_INITED;
    if SA_CLOUD_STAGE_INITED {
        log "Thanks for using cloud requests!";
    } else {
        error "SA CLOUD REQUESTS: Cloud vars are not inited: add `%include inflator/cloud_requests/stage` to `stage.gs`";
        breakpoint;
    }
}

ontimer > 0 {
    SA_CLOUD_INIT;
}

%if not SA_DISABLE_RECEIVER
onflag {
    sa_message_receiver;
}
%endif

nowarp proc sa_message_receiver {
    sa_init;
    forever {
        sa_check;
    }
}

proc sa_init {
    delete sa_old_cloud_values;
    add "=" & FROM_HOST_1 to sa_old_cloud_values;
    add "=" & FROM_HOST_2 to sa_old_cloud_values;
    add "=" & FROM_HOST_3 to sa_old_cloud_values;
    add "=" & FROM_HOST_4 to sa_old_cloud_values;
    add "=" & FROM_HOST_5 to sa_old_cloud_values;
    add "=" & FROM_HOST_6 to sa_old_cloud_values;
    add "=" & FROM_HOST_7 to sa_old_cloud_values;
    add "=" & FROM_HOST_8 to sa_old_cloud_values;
    add "=" & FROM_HOST_9 to sa_old_cloud_values;
    
    delete sa_on_send_parsed_responses;
    add "" to sa_on_send_parsed_responses;
}

%include inflator/cloud_requests/src/check
%include inflator/cloud_requests/src/encode
%include inflator/cloud_requests/src/decode
%include inflator/cloud_requests/src/request
