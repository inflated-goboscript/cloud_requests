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

proc _sa_do_nothing arg {}

proc SA_CLOUD_INIT {
    _sa_do_nothing FROM_HOST_1;
    _sa_do_nothing FROM_HOST_2;
    _sa_do_nothing FROM_HOST_3;
    _sa_do_nothing FROM_HOST_4;
    _sa_do_nothing FROM_HOST_5;
    _sa_do_nothing FROM_HOST_6;
    _sa_do_nothing FROM_HOST_7;
    _sa_do_nothing FROM_HOST_8;
    _sa_do_nothing FROM_HOST_9;
    _sa_do_nothing TO_HOST;
}
