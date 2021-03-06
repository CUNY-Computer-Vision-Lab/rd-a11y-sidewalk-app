function HandAnimation (rootDirectory, uiOnboarding) {
    var layer;
    var stage = null;
    var OpenHand;
    var ClosedHand;
    var OpenHandReady = false;
    var ClosedHandReady = false;
    var ImageObjOpenHand = new Image();
    var ImageObjClosedHand = new Image();
    var $handGestureHolder = uiOnboarding.holder.find('#hand-gesture-holder');
    var onboardingImageDirectory = rootDirectory + "img/onboarding/";

    this.initializeHandAnimation = function () {
        if ($handGestureHolder.length == 1) {
            this.hideGrabAndDragAnimation();

            if (!stage) {
                stage = new Kinetic.Stage({
                    container: $handGestureHolder.get(0),
                    width: 720,
                    height: 200
                });
                layer = new Kinetic.Layer();
                stage.add(layer);

                ImageObjOpenHand.onload = function () {
                    OpenHand = new Kinetic.Image({
                        x: 0,
                        y: stage.getHeight() / 2 - 59,
                        image: ImageObjOpenHand,
                        width: 128,
                        height: 128
                    });
                    OpenHand.hide();
                    layer.add(OpenHand);
                    OpenHandReady = true;
                };
                ImageObjOpenHand.src = onboardingImageDirectory + "HandOpen.png";

                ImageObjClosedHand.onload = function () {
                    ClosedHand = new Kinetic.Image({
                        x: 300,
                        y: stage.getHeight() / 2 - 59,
                        image: ImageObjClosedHand,
                        width: 96,
                        height: 96
                    });
                    ClosedHand.hide();
                    layer.add(ClosedHand);
                    ClosedHandReady = true;
                };
                ImageObjClosedHand.src = onboardingImageDirectory + "HandClosed.png";
            }
        }
    };

    /**
     * References:
     * Kineticjs callback: http://www.html5canvastutorials.com/kineticjs/html5-canvas-transition-callback-with-kineticjs/
     * Setposition: http://www.html5canvastutorials.com/labs/html5-canvas-animals-on-the-beach-game-with-kineticjs/
     */
    this.animateHand = function (direction) {
        if (direction === 'left-to-right') {
            ClosedHand.hide();
            OpenHand.setPosition(350,100);
            OpenHand.show();
            OpenHand.transitionTo({
                x: 350,
                y: 30,
                duration : 0.5,
                callback : function () {
                    setTimeout(function () {
                        OpenHand.hide();
                        ClosedHand.setPosition(400, 60);
                        ClosedHand.show();
                        ClosedHand.transitionTo({
                            x: 550,
                            y: 60,
                            duration: 1
                        });
                    }, 300);
                }
            });
        } else {
            ClosedHand.hide();
            OpenHand.setPosition(200,100);
            OpenHand.show();
            OpenHand.transitionTo({
                x: 200,
                y: 0,
                duration : 0.5,
                callback : function () {
                    setTimeout(function () {
                        OpenHand.hide();
                        ClosedHand.setPosition(200, 30);
                        ClosedHand.show();
                        ClosedHand.transitionTo({
                            x: 0,
                            y: 30,
                            duration: 1
                        });
                    }, 300);
                }
            });
        }
    };

    this.showGrabAndDragAnimation = function (parameters) {
        if (ClosedHandReady && OpenHandReady) {
            uiOnboarding.handGestureHolder.css("visibility", "visible");
            this.animateHand("left-to-right");
            return setInterval(this.animateHand.bind(null, "left-to-right"), 2000);
        }
    };

    this.hideGrabAndDragAnimation = function (interval) {
        // clearInterval(handAnimationInterval);
        clearInterval(interval);
        uiOnboarding.handGestureHolder.css("visibility", "hidden");
    }
}