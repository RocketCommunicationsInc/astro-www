type __HomeCommunity = typeof import('project:data/home-community.json')

interface Source {
	HomeCommunity: __HomeCommunity
	HomeCommmunityEvents: __HomeCommunity['data']['events']['data']
	HomeCommunityLinks: __HomeCommunity['data']['links']['data']
}

export type Type<T extends keyof Source> = Source[T]
