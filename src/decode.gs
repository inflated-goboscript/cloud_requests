
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

proc _sa_decode_resp resp {
    # = resp[-1:-4]
    # = either 2222 or 3222
    local validation = $resp[length $resp] & $resp[length $resp-1] & $resp[length $resp-2] & $resp[length $resp-3];
    if validation == 2222 or validation == 3222 {
        # validation==3222 means that the value is a raw int
        local encoded = validation == 2222;
        if _sa_receiving_send_message {
            sa_on_send_parsed_responses["last"] = $resp;
        } else {
            sa_parsed_responses["last"] = $resp;
            if "" in sa_parsed_responses {
                broadcast "_sa_request_missing_parts";
            }
        }
    } else {
        # = validaton[:-1]
        local ct = validation[1] & validation[2] & validation[3];
        if _sa_receiving_send_message {
            until length sa_on_send_parsed_responses > ct {
                add "" to sa_on_send_parsed_responses;
            }
            sa_on_send_parsed_responses[ct] = $resp;
        } else {
            until length sa_parsed_responses > ct {
                add "" to sa_parsed_responses;
            }
            sa_parsed_responses[ct] = $resp;
        }
    }

    if _sa_receiving_send_message {
        if not ("re-request" in sa_on_send_parsed_responses or "" in sa_on_send_parsed_responses) {
            sa_request_status = SAStatuses.sent_from_server;
            # read and decode server message
            error "not implemented 💀";
            breakpoint;
        }
    } else {
        if not ("re-request" in sa_parsed_responses or "" in sa_parsed_responses) {
            sa_request_status = SAStatuses.done;
        }
    }
}

on "_sa_request_missing_parts" {
    error "not implemented 💀";
    breakpoint;
}
