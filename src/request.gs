nowarp proc send_request content {
    delete sa_parsed_responses;
    add "" to sa_parsed_responses;

    delete sa_to_send;

    sa_request = $content;

    local encoded = _sa_encode($content);

    # nowarp proc _request data $data, data = encoded:

    local raw_output = "";
    sa_request_status = SAStatuses.loading;

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
    local start_time = TIME();

    delete sa_parsed_responses;
    add "" to sa_parsed_responses;
    
    until sa_request_status == SAStatuses.done or TIME() - start_time > sa_timeout_after {
        sa_check;
    }
    if TIME() - start_time > sa_timeout_after {
        sa_request_status = SAStatuses.timeout;
    } else {
        broadcast "sa_on_server_response";
    }
    _sa_decode _sa_read_responses();
}

func _sa_read_responses() {
    local i = 1;
    local ret = "";
    repeat length sa_parsed_responses {
        local j = 1;
        if "." in sa_parsed_responses[i] {
            until sa_parsed_responses[i][j] == "." {
                ret &= sa_parsed_responses[i][j];
                j++;
            }
        }
        i++;
    }
    return ret;
}
