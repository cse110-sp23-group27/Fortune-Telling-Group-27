export const FORTUNETYPES = {
	tarotCard: "tarot",
	egg: "egg",
	bone: "bone"
};

export const FORTUNELIST = ["tarot", "egg", "bone"];


// card animation consts

// pre shuffle, pre throw
export const preThrow_card_pos = {x: 50, y: 95};

// pre shuffle, after throw
export const afterThrow_card_X_min = 5;
export const afterThrow_card_X_max = 95;
export const afterThrow_card_Y_min = 0;
export const afterThrow_card_Y_max = 50;
export const afterThrow_card_Rotation_min = -180;
export const afterThrow_card_Rotation_max = 180;

// shuffle
export const shuffle_deck_pos = {x: 30, y: 20};
export const shuffle_card_pos = {x: 60, y: 20};

//spread
export const spread_card_X_left = 20;
export const spread_card_X_right = 80;
export const spread_card_Y = 0;

export const CARDS = ["The Fool", "The Magician", "The High Priestess", "The Empress",
					  "The Emperor", "The Hierophant", "The Lovers", "The Chariot",
					  "Strength", "The Hermit", "The Wheel of Fortune", "Justice",
					  "The Hanged Man", "Death", "Temperance", "The Tower",
					  "The Star", "The Moon", "The Sun", "Judgement", "The World"];

export const cardBack = "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/card-back.png";

export const CARDSJSON = [
	{
		"name": "The Fool",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-fool.png",
		"imgDescription": "The Fool card: A young man standing at the edge of a cliff.",
		"pastDescription": "In the past, you embarked on a journey of discovery, taking risks and embracing new experiences that shaped your character.",
		"presentDescription": "Currently, you find yourself in a state of spontaneity and embracing the unknown. You are stepping into new beginnings and taking risks with a sense of childlike wonder and optimism.",
		"futureDescription": "In the future, the Fool signifies a period of limitless possibilities and exciting adventures. You will have the opportunity to embark on a new path with fresh perspectives, bringing forth new."
	},
	{
		"name": "The Magician",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-magician.png",
		"imgDescription": "The Magician card: figure standing confidently with a sense of power and mastery.",
		"pastDescription": "Your past was marked by a time of great personal power and manifestation, where you harnessed your skills and talents to achieve significant accomplishments.",
		"presentDescription": "In the present, you possess the ability to manifest your desires and transform your reality. You have the tools and resources at your disposal to create positive change.",
		"futureDescription": "The future holds immense potential for you to utilize your talents and skills in a transformative way. With focus and determination, you can achieve remarkable results and manifest your dreams."
	},
	{
		"name": "The High Priestess",
		"imgDescription": "The High Priestess card: a serene and enigmatic figure that emanates wisdom and inner knowledge.",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-high-priestess.png",
		"pastDescription": "In the past, you had a deep connection with your intuition and inner wisdom, guiding you through mysterious and transformative experiences.",
		"presentDescription": "In the present, you possess the ability to manifest your desires and transform your reality. You have the tools and resources at your disposal to create positive change.",
		"futureDescription": "The future holds immense potential for you to utilize your talents and skills in a transformative way. With focus and determination, you can achieve remarkable results and manifest your dreams."
	},
	{
		"name": "The Empress",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-empress.png",
		"imgDescription": "The Empress card: a maternal figure crowned with a wreath of flowers seats comfortably on a lush and verdant throne.",
		"pastDescription": "In the past, you experienced a phase of abundance and nurturing. You cultivated creativity and embraced sensual pleasure, fostering growth and fulfillment.",
		"presentDescription": "Currently, you are in a period of nurturing and creative abundance. The Empress suggests that you tap into your nurturing instincts and enjoy the bountiful opportunities surrounding you.",
		"futureDescription": "The future holds a continuation of abundance and creativity. The Empress signifies the manifestation of your desires and the nurturing of your dreams. Prepare for a time of flourishing and abundance."
	},
	{
		"name": "The Emperor",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-emperor.png",
		"imgDescription": "The Emperor: an emperor seats on his grand throne.",
		"pastDescription": "In the past, you embraced qualities of leadership, authority, and structure. You may have established a solid foundation or made significant progress in your endeavors.",
		"presentDescription": "Currently, you are called to embrace your inner power and take charge of your life. The Emperor indicates that you have the ability to establish order and structure, providing a strong foundation for your future.",
		"futureDescription": "The future holds a time of increased authority and leadership. The Emperor suggests that you will have the opportunity to bring your plans to fruition and establish a position of influence and stability."
	},
	{
		"name": "The Hierophant",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-hierophant.png",
		"imgDescription": "The Hierophant card: a spiritual leader sits between two pillars, holding a staff, and surrounded by followers.",
		"pastDescription": "Your past was influenced by traditions, teachings, and spiritual guidance. You may have sought wisdom from mentors or adhered to established belief systems.",
		"presentDescription": "In the present, you are exploring your spiritual path and seeking guidance from trusted sources. The Hierophant signifies a time of learning and growth through structured beliefs and practices.",
		"futureDescription": "The future holds the opportunity to deepen your spiritual connection and expand your knowledge. The Hierophant suggests that you will find wisdom and guidance from spiritual teachers or within established traditions."
	},
	{
		"name": "The Lovers",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-lovers.png",
		"imgDescription": "The Lovers card: a divine being observes a couple as they gaze each other lovingly.",
		"pastDescription": "In the past, you experienced significant relationships or choices that influenced your path. The Lovers card indicates a time of love, partnerships, and decisions that shaped your journey.",
		"presentDescription": "Currently, you are facing choices related to love, relationships, and personal values. The Lovers card advises embracing embracing authentic connections, open communication, and exploring different aspects of yourself for personal growth",
		"futureDescription": "The future holds a time of profound choices and significant relationships. The Lovers card suggests that you will be presented with decisions that deeply impact your life's trajectory, particularly in matters of love, partnerships, and personal values. Trust your intuition and make choices that align with your heart's true desires, as they will bring about harmony and fulfillment in your relationships."
	},
	{
		"name": "The Chariot",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-chariot.png",
		"imgDescription": "The Chariot card: a men sits on a majestic chariot pulled by two sphinxes.",
		"pastDescription": "In the past, you experienced a time of great determination and focused energy. You overcame challenges and obstacles with unwavering determination, propelling you forward on your journey towards success and accomplishment.",
		"presentDescription": "Currently, you are in a phase of assertiveness and self-control. The Chariot card suggests that you are harnessing your inner strength and willpower to navigate through any obstacles and achieve your goals. Your determination and focused drive are propelling you towards victory and personal growth.",
		"futureDescription": "The future holds a period of triumph and achievement. The Chariot signifies that you will have the power and control to overcome any hurdles that come your way. With your unwavering focus and strong determination, you will make significant progress, reaching new heights of success and fulfillment in your endeavors."
	},
	{
		"name": "Strength",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/strength.png",
		"imgDescription": "Strength card: a woman gently and fearlessly tames a powerful lion.",
		"pastDescription": "In the past, you displayed remarkable inner strength and resilience. You confronted challenges with courage and grace, overcoming obstacles and demonstrating your ability to stay grounded in the face of adversity. Your past experiences have shaped you into a resilient individual with a strong sense of self.",
		"presentDescription": "Currently, you are tapping into your inner strength and personal power. The Strength card suggests that you have the ability to handle any situation with patience, compassion, and grace. You possess a calm and balanced approach that empowers you to navigate challenges and conflicts with confidence.",
		"futureDescription": "The future holds a time of continued inner strength and fortitude. The Strength card indicates that you will face upcoming challenges with resilience and courage. Trust in your inner resources and ability to stay grounded. By maintaining your composure and harnessing your personal power, you will emerge victorious and overcome any obstacles that come your way."
	},
	{
		"name": "The Hermit",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-hermit.png",
		"imgDescription": "The Hermit card: an old wise figure carrying a lantern stands alone atop a mountain.",
		"pastDescription": "In the past, you experienced a period of introspection and soul-searching. The Hermit card suggests that you sought solitude and embraced moments of deep reflection and inner wisdom. This phase of introspection has allowed you to gain valuable insights and cultivate a deeper understanding of yourself.",
		"presentDescription": "Currently, you find yourself in a state of solitude and introspection. The Hermit card indicates that you are on a quest for deeper meaning and inner guidance. It is a time of self-reflection, seeking answers within and detaching from external distractions. Trust your intuition and allow the wisdom you acquire during this period to guide your actions.",
		"futureDescription": "The future holds a time of continued self-discovery and inner enlightenment. The Hermit signifies a period where you will further deepen your understanding of yourself and the world around you. Embrace solitude and introspection as you navigate your path forward. The insights you gain will lead to personal growth and a heightened sense of purpose."
	},
	{
		"name": "The Wheel of Fortune",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-wheel-of-fortune.png",
		"imgDescription": "The Wheel of Fortune card: a wheel of fortune surrounded by mythological creatures.",
		"pastDescription": "In the past, you experienced a significant turning point or a stroke of luck that altered the course of your life. The Wheel of Fortune indicates that you went through cycles of ups and downs, and those changes have shaped your journey.",
		"presentDescription": "Currently, you are in a phase of unpredictability and change. The Wheel of Fortune suggests that there are opportunities for growth and transformation presenting themselves to you. Embrace the ebb and flow of life and be open to the possibilities that come your way.",
		"futureDescription": "The future holds a time of favorable circumstances and positive outcomes. The Wheel of Fortune signifies that a stroke of luck or a fortunate turn of events is on the horizon. Embrace the changes that come your way and trust that the universe is working in your favor."
	},
	{
		"name": "Justice",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/justice.png",
		"imgDescription": "Justice card: a woman stands upright while holding a scale and a sword.",
		"pastDescription": "In the past, you experienced a period of seeking truth, fairness, and balance. The Justice card indicates that you made choices based on principles and moral values, seeking justice and equality in your actions. Your past decisions have contributed to the harmony and balance in your life today.",
		"presentDescription": "Currently, you are in a phase of seeking truth, fairness, and balance in your life. The Justice card suggests that you are making decisions based on objective reasoning and fairness. You are called to act with integrity and consider the consequences of your actions. Embrace the principles of justice in all aspects of your life.",
		"futureDescription": "The future holds a time of karmic balance and accountability. The Justice card signifies that the choices you make in the future will have consequences, both positive and negative. Trust that justice will be served, and you will experience the consequences of your actions in due course."
	},
	{
		"name": "The Hanged Man",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-hanged-man.png",
		"imgDescription": "The Hanged Man card: a man hangs off a tree with one foot tied to a branch.",
		"pastDescription": "In the past, you willingly let go of old patterns and gained new insights by adopting a different perspective. The Hanged Man card signifies a period of surrender and introspection. The transformative phase you went through allowed for spiritual growth and opened doors to new possibilities.",
		"presentDescription": "Currently, you are in a phase of suspension or waiting. The Hanged Man card indicates that you are being asked to let go of resistance and to surrender to the present moment. Through surrender, you will gain new insights and clarity that will ultimately guide you forward.",
		"futureDescription": "The future holds a time of profound transformation and spiritual enlightenment. The Hanged Man suggests that you will willingly sacrifice old beliefs and perspectives to embrace a higher truth. Embrace the necessary surrender and trust that it will lead to greater wisdom and personal evolution."
	},
	{
		"name": "Death",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/death.png",
		"imgDescription": "Death card: a skeleton wielding a scythe standing on top of bodies.",
		"pastDescription": "In the past, you experienced a significant transformation or the ending of a major chapter in your life. The Death card suggests that this transition brought about profound change and personal growth, paving the way for a new beginning.",
		"presentDescription": "Currently, you are in the midst of a transformation or facing an ending of some kind. The Death card signifies the need to release what no longer serves you, allowing space for new beginnings. Embrace the process of letting go and trust that from the ashes, something beautiful will emerge.",
		"futureDescription": "The future holds a period of rebirth and renewal. The Death card signifies that significant transformations are on the horizon, bringing about positive change and new opportunities. Embrace the endings and the new beginnings that await you."
	},
	{
		"name": "Temperance",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/temperance.png",
		"imgDescription": "Temperance card: an angelic figure with wings pouring water between two cups.",
		"pastDescription": "In the past, you found balance and harmony by integrating opposing forces in your life. The Temperance card suggests that you navigated through challenges with patience, moderation, and a harmonious approach.",
		"presentDescription": "Currently, you are in a phase of finding balance and moderation in your life. The Temperance card indicates that you are combining different aspects of your life in a harmonious way. Embrace patience and find the middle ground as you navigate through various situations.",
		"futureDescription": "The future holds a time of restored balance and harmony. The Temperance card suggests that you will find equilibrium in all areas of your life, bringing a sense of peace and serenity. Embrace the integration of opposing forces, and you will experience a state of overall well-being."
	},
	{
		"name": "The Devil",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-devil.png",
		"imgDescription": "The Devil card: a horned and winged satyr-like figure on a pedestal that chains a man and a woman.",
		"pastDescription": "In the past, you encountered situations or patterns that kept you bound or restricted in some way. The Devil card indicates that you may have experienced limitations or addictive behaviors that you needed to break free from in order to grow.",
		"presentDescription": "Currently, you may be grappling with attachments or negative patterns in your life. The Devil card suggests the need to confront and release these patterns that hold you back from true freedom and self-expression. Embrace self-awareness and make conscious choices to liberate yourself from these constraints.",
		"futureDescription": "The future holds a time of liberation and breaking free from the chains that have bound you. The Devil card signifies that you will confront and release the negative patterns, addictions, or limiting beliefs that have held you back. Through your determination and inner strength, you will reclaim your personal power and experience a newfound sense of freedom and authenticity."
	},
	{
		"name": "The Tower",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-tower.png",
		"imgDescription": "The Tower card: a tall tower on a cliff being struck by lightning and burning down while people fall down.",
		"pastDescription": "In the past, you experienced a significant upheaval or sudden change that shattered existing structures in your life. The Tower card indicates that this disruption, though challenging, cleared the way for new growth and transformation.",
		"presentDescription": "Currently, you may be facing unexpected events or upheaval in your life. The Tower card suggests that these disruptions are part of a necessary process of breaking down outdated beliefs or structures. Embrace the change and trust that it will lead to a stronger foundation and new beginnings.",
		"futureDescription": "The future holds a time of rebuilding and renewal after a period of upheaval. The Tower card signifies that the structures in your life will be reconstructed in a more authentic and aligned way. Embrace the transformation and use this opportunity to create a stronger and more resilient future."
	},
	{
		"name": "The Star",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-star.png",
		"imgDescription": "The Star card: multiple stars shine upon a woman kneeling besides a lake",
		"pastDescription": "In the past, you experienced a time of hope, inspiration, and healing. The Star card indicates that you found guidance and inner strength during a challenging period, leading to renewed optimism and a sense of purpose.",
		"presentDescription": "Currently, you are in a phase of hope, inspiration, and renewed faith in the future. The Star card suggests that you are connected to your higher purpose and are aligned with the universe's flow. Embrace your inner guidance and allow it to lead you towards your dreams.",
		"futureDescription": "The future holds a time of fulfillment, inspiration, and spiritual growth. The Star card signifies that your dreams and aspirations will be realized. Trust in the universe's guidance, stay connected to your inner light, and allow it to shine brightly, illuminating your path towards success and fulfillment."
	},
	{
		"name": "The Moon",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-moon.png",
		"imgDescription": "The Moon card: a full moon shining upon a wolf and a dog between two towers.",
		"pastDescription": "In the past, you navigated through a period of uncertainty, illusions, and hidden emotions. The Moon card indicates that you faced challenges and shadows, gaining valuable insights into your subconscious mind and intuition.",
		"presentDescription": "Currently, you are in a phase of deep introspection and exploring the realms of your subconscious mind. The Moon card suggests that there may be hidden aspects or emotions surfacing, inviting you to embrace them and integrate them into your conscious awareness. Trust your intuition and navigate through this phase with grace and self-compassion.",
		"futureDescription": "The future holds a time of heightened intuition and spiritual growth. The Moon card signifies that you will continue to delve into the depths of your psyche, gaining profound insights and understanding. Embrace the mysteries of life and allow your intuition to guide you towards your highest path."
	},
	{
		"name": "The Sun",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-sun.png",
		"imgDescription": "The Sun card: a radiant sun shining upon a child riding a horse",
		"pastDescription": "In the past, you experienced a period of joy, vitality, and success. The Sun card indicates that you radiated positive energy, and your actions brought about abundance and fulfillment.",
		"presentDescription": "Currently, you are in a phase of optimism, vitality, and self-expression. The Sun card suggests that you are aligned with your true self and are experiencing a sense of joy and positivity. Embrace this energy, let it guide your actions, and share your light with others.",
		"futureDescription": "The future holds a time of continued success, happiness, and fulfillment. The Sun card signifies that your path will be illuminated, and your efforts will be rewarded. Embrace the opportunities that come your way, and let your inner light shine brightly for all to see."
	},
	{
		"name": "Judgement",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/judgement.png",
		"imgDescription": "Judgement card: an angelic figure with wings and a trumpet hovering in the sky",
		"pastDescription": "In the past, you experienced a powerful awakening or a significant realization that prompted you to reassess your life's direction. The Judgment card indicates that you underwent a transformative period of self-reflection and made choices that aligned with your higher self.",
		"presentDescription": "Currently, you are in a phase of self-evaluation and accountability. The Judgment card suggests that you are being called to review past actions, make amends if necessary, and embrace a fresh start. It is a powerful card that symbolizes a spiritual awakening and the need for personal transformation.",
		"futureDescription": "The future holds a time of profound transformation, renewal, and awakening. The Judgment card signifies that you will be called to embrace a higher purpose and make choices that align with your authentic self. This is a period of spiritual growth and self-evaluation, where you will have the opportunity to let go of past judgments and embrace forgiveness and healing. Through this process, you will experience a profound rebirth and a renewed sense of purpose."
	},
	{
		"name": "The World",
		"img": "https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-world.png",
		"imgDescription": "The World card: a woman standing inside a wreath",
		"pastDescription": "In the past, you experienced a sense of completion and fulfillment. The World card indicates that you achieved a significant milestone or accomplished a long-held goal. You embraced your personal journey with a sense of wholeness and integration, laying the foundation for future endeavors.",
		"presentDescription": "Currently, you are in a phase of culmination and celebration. The World card suggests that you have reached a point of balance and harmony in various areas of your life. You are experiencing a sense of fulfillment and are aligned with the universe's flow. Embrace the present moment and celebrate your achievements.",
		"futureDescription": "The future holds a time of expansion and integration on a higher level. The World card signifies that you will embark on a new phase of your journey, where you will have the opportunity to integrate your experiences and expand your horizons. Embrace new opportunities and embrace the interconnectedness of all aspects of your life. As you move forward, remember that you have the wisdom and resources to navigate any challenges that may arise."
	}
];