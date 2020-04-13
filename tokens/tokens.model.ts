const tokens = [
  {
    text: `Apollo 13 (April 11–17, 1970) was the seventh crewed mission in the Apollo space 
program and the third meant to land on the Moon. The landing was aborted after 
an oxygen tank in the service module (pictured) failed two days into the mission. 
Apollo 13 was commanded by Jim Lovell with Jack Swigert as command module (CM) 
pilot and Fred Haise as lunar module (LM) pilot. Swigert was a late replacement 
for Ken Mattingly, who was grounded after exposure to rubella. After the explosion, 
the CM's systems had to be shut down to conserve resources, forcing the crew to transfer 
to the LM as a lifeboat. Although the LM was designed to support two men for two days, 
Mission Control improvised new procedures so it could support three men for four days. 
The astronauts' peril briefly renewed interest in the Apollo program; tens of millions 
watched the splashdown in the South Pacific Ocean by television. The story of 
Apollo 13 has been dramatized, most notably in the 1995 film Apollo 13.`,
    tokenSelected: 10
  }
]

export class Token {
  static findAll(): Promise<any[]> {
    return Promise.resolve(tokens)
  }
}
