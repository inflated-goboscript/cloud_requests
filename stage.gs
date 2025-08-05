# Include this in the stage to init the scratchattach cloud vars.

cloud FROM_HOST_1;
cloud FROM_HOST_2;
cloud FROM_HOST_3;
cloud FROM_HOST_4;
cloud FROM_HOST_5;
cloud FROM_HOST_6;
cloud FROM_HOST_7;
cloud FROM_HOST_8;
cloud FROM_HOST_9;
cloud TO_HOST;

var SA_CLOUD_STAGE_INITED = true;

onflag {SA_CLOUD_INIT;}

proc SA_CLOUD_INIT {
    log "SA_CLOUD_STAGE_INITED: CLOUD VARS: ";
    log "FROM_HOST_1=" & FROM_HOST_1;
    log "FROM_HOST_2=" & FROM_HOST_2;
    log "FROM_HOST_3=" & FROM_HOST_3;
    log "FROM_HOST_4=" & FROM_HOST_4;
    log "FROM_HOST_5=" & FROM_HOST_5;
    log "FROM_HOST_6=" & FROM_HOST_6;
    log "FROM_HOST_7=" & FROM_HOST_7;
    log "FROM_HOST_8=" & FROM_HOST_8;
    log "FROM_HOST_9=" & FROM_HOST_9;
    log "TO_HOST=" & TO_HOST;
}
