class Targeter {
    constructor(target) {
        this.target = target

        this.currentPosition = {
            x: 0,
            y: 0
        }
        
        this.currentOrientation = 0
        this.deadzone = 10
    }

    setPosition(position) {
        this.currentPosition = position
    }

    setOrientation(angle) {
        this.currentOrientation = angle
    }

    setTarget(target) {
        this.target = target
    }

    getTargetDirection() {
        const temp = {
            x: this.target.x - this.currentPosition.x,
            y: this.target.y - this.currentPosition.y
        }
        return this.getAngleToVector(temp)
    }

    getAngleToVector(vec) {
        return Math.atan2(vec.y, vec.x)
    }

    getTargetDirectionDelta() {
        return ((d1, d2) => {return Math.abs(d1) < Math.abs(d2) ? d1 : -d2})
            (this.getTargetDirection() - this.currentOrientation,
            -this.getTargetDirection() + this.currentOrientation - 360)
    }

    getTurnDirection() {
        const delta = this.getTargetDirectionDelta()
        if (Math.abs(delta) < this.deadzone) return 0
        return delta > 0 ? 1 : -1
    }
}

module.exports = Targeter