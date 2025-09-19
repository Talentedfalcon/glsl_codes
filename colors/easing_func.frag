#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform float u_time;

float bounceOut(float t){
    if(t<=0.446){
        return 2.*t;
    }
    else{
        return -abs(0.5*cos(3.5*PI*t)/(2.*t))+1.;
    }
}

void main(){
    vec3 colorA=vec3(1.,0.,0.);
    vec3 colorB=vec3(0.,0.,1.);

    vec3 color=vec3(0.);

    float percent=bounceOut(fract(u_time*0.5));
    
    color=mix(colorA,colorB,percent);

    gl_FragColor=vec4(color,1.);
}

