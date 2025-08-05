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
