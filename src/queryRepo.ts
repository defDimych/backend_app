type DBVideo = {
    _id: string,
    title: string,
    authorId: string,
    banObject: null | {
        isBanned: boolean,
        banReason: string
    }
}

type DBAuthor = {
    _id: string,
    firstName: string,
    lastName: string
}

export type VideoOutputModel = {
    id: string,
    title: string,
    author: {
        id: string,
        name: string
    }
}

export type BannedVideoOutputModel = {
    id: string,
    title: string,
    author: {
        id: string,
        name: string
    }
    banReason: string
}

const videoQueryRepo = {
    getVideos(): VideoOutputModel[] {
        const dbVideos: DBVideo[] = []
        const authors: DBAuthor[] = []

        return dbVideos.map(dbVideo => {
            const author = authors.find(a => dbVideo.authorId === a._id);

            return this._mapDBVideoToVideoOutputModel(dbVideo, author!);
        })
    },

    getBannedVideos(): BannedVideoOutputModel[] {
        const dbVideos: DBVideo[] = []
        const authors: DBAuthor[] = []

        return dbVideos.map(dbVideo => {
            const dbAuthor = authors.find(a => dbVideo.authorId === a._id);

            return {
                id: dbVideo._id,
                title: dbVideo.title,
                author: {
                    id: dbAuthor!._id,
                    name: dbAuthor!.firstName + ' ' + dbAuthor!.lastName
                },
                banReason: dbVideo.banObject!.banReason
            };
        })
    },

    getVideoById(id: string): VideoOutputModel {
        const dbVideo: DBVideo = {
            _id: '123',
            title: 'title',
            authorId: '321',
            banObject: null
        };

        const author: DBAuthor = {
            _id: '321',
            firstName: 'Дмитрий',
            lastName: 'Абрасимовский'
        };

        return this._mapDBVideoToVideoOutputModel(dbVideo, author);
    },
    
    _mapDBVideoToVideoOutputModel(dbVideo: DBVideo, dbAuthor: DBAuthor) {
        return {
            id: dbVideo._id,
            title: dbVideo.title,
            author: {
                id: dbAuthor!._id,
                name: dbAuthor!.firstName + ' ' + dbAuthor!.lastName
            }
        }
    }
}