proc sa_check {
    _sa_check_cloud_var FROM_HOST_2;
    _sa_check_cloud_var FROM_HOST_3;
    _sa_check_cloud_var FROM_HOST_4;
    _sa_check_cloud_var FROM_HOST_5;
    _sa_check_cloud_var FROM_HOST_6;
    _sa_check_cloud_var FROM_HOST_7;
    _sa_check_cloud_var FROM_HOST_8;
    _sa_check_cloud_var FROM_HOST_9;
}

proc _sa_check_cloud_var val {
    if "=" & $val not in sa_old_cloud_values {
        add "=" & $val to sa_old_cloud_values;
        if length sa_old_cloud_values > 20 {
            delete sa_old_cloud_values[1];
        }

        if sa_request_id in $val and sa_request_id != "" {
            _sa_receiving_send_message = false;
            sa_request_status = SAStatuses.receiving;
            if $val not in sa_parsed_responses {
                _sa_decode_resp $val;
            }
        }
        if ".100000000" in $val {
            _sa_receiving_send_message = true;
            sa_request_status = SAStatuses.receiving_message;
            if $val not in sa_on_send_parsed_responses {
                _sa_decode_resp $val;
            }
        }
    }
}
