#pragma strict

var flashLightLightSource : Light;
var lightOn : boolean=true;
var lightDrain : float= 0.3;
var batteryLife :float= 0.0;
var maxBatteryLife : float = 10.0;

var soundTurnOn : AudioClip;
var soundTurnOff : AudioClip;

function Start()
{
	batteryLife=maxBatteryLife;
	flashLightLightSource=GetComponent(Light);
}

function update()
{
	if (lightOn && batteryLife>=0)
	{
		batteryLife-= Time.deltaTime * lightDrain;
	}

	flashLightLightSource.GetComponent.<Light>().intensity =batteryLife;
	if (batteryLife <=0)
	{
		batteryLife=0;
		lightOn=false;
	}
	if ( Input.GetKeyUp(KeyCode.F))
	{
		toggleFlashlight();
		toggleFlashlightSFX();
		if (lightOn)
		{
			lightOn=false;
		}
		else if (!lightOn && batteryLife>=0) {
			lightOn=true;
		}

	}
}

function toggleFlashlight()
{
	if(lightOn)
	{
		flashLightLightSource.enabled= false;
	}
	else
	{
		flashLightLightSource.enabled= true;

	}
}

function toggleFlashlightSFX()
{
	if(flashLightLightSource.enabled)
	{
		GetComponent.<AudioSource>().clip= soundTurnOn;
	}
	else{
		GetComponent.<AudioSource>().clip= soundTurnOff;
	}
	GetComponent.<AudioSource>().Play();
}

@script RequireComponent(AudioSource)