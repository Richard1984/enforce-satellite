class Archiver {
	constructor(storage) {
		this.storage = storage
		this.missionId = null
	}

	beginMission() {
		this.missionId = Date.now()
		this.storage.startMission(this.missionId)
	}

	endMission() {
		this.missionId = null
	}

	saveData(data) {
		if (this.missionId === null) return
		return new Promise((resolve, reject) => {
			data = Object.assign(data, {
				missionID: this.missionId
			})
			this.storage.save(data)
			resolve()
		})
	}
}

module.exports = Archiver
