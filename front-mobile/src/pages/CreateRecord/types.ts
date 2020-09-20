export type GamePlatform = 'XBOX' | 'PC' | 'PLAYSTATION';

export type Game = {
    id: number;
    title: string;
    platform: GamePlatform;
    //strings adicionadas para podermos integrar ao componente select
    label: string;
    value: number;
}