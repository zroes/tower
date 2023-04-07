export class TowerEvent {
  constructor(data) {
    if (data) {
      this.id = data.id
      this.creatorId = data.creatorId
      this.name = data.name
      this.description = data.description
      this.coverImg = data.coverImg || 'https://cloudfront-us-east-1.images.arcpublishing.com/pmn/2S6GFFNY4BGMBL6GEAQ2AWS2BM.jpg'
      this.location = data.location
      this.capacity = data.capacity
      this.startDate = new Date(data.startDate)
      this.isCanceled = data.isCanceled || false
      this.type = data.type
      this.creator = data.creator
    }
  }
}