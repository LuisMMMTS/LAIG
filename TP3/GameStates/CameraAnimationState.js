/**
 * 
 */
class CameraAnimationState extends GameState {
    constructor(orchestrator) {
        super(orchestrator)
        this.orchestrator.updateInfo("")
        this.orchestrator.updatePlayTime(0)
        this.orchestrator.scene.animateCamera()
        this.orchestrator.scene.camera.active = true;

    }

    init() {
        unColorTiles(this.orchestrator);
        if (this.orchestrator.playingMovie) endavailableButtons(this.orchestrator, [])
        else availableButtons(this.orchestrator, [])
    }

    update(time) {
        if (this.orchestrator.paused) return
        if (this.orchestrator.scene.getCurrentCamera() == "player1" || this.orchestrator.scene.getCurrentCamera() == "player2") {
            let p1 = this.orchestrator.scene.themeGraphs[this.orchestrator.scene.selectedTheme].views["player1"];
            let p2 = this.orchestrator.scene.themeGraphs[this.orchestrator.scene.selectedTheme].views["player2"];

            if (this.orchestrator.scene.camera.active)
                this.orchestrator.scene.camera.update(time)

            if (this.orchestrator.scene.camera.active == false) {
                this.orchestrator.changeState(new ReadyState(this.orchestrator));
            }
        } else {
            this.orchestrator.changeState(new ReadyState(this.orchestrator));
        }


    }

}