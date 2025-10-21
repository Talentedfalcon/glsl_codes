#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

vec3 hsv2rgb( vec3 c ){
    // abs(
    //     mod(
    //         c.x*6.0+vec3(0.0,4.0,2.0),6.0
    //     )
    //     -3.0
    // )-1.0,
    vec3 rgb = clamp(
        abs(
            mod(
                c.x*6.0+vec3(0.0,4.0,2.0),6.0
            )-3.0
        )-1.0,
        0.0,
        1.0
    );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb.rgb, c.y);   
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.0);

    //Convert center to (0.5,0.5)
    vec2 toCenter=vec2(0.5)-st;
    //theta=atan(y/x); range (-PI/2,PI/2)
    float angle=atan(toCenter.x,toCenter.y);
    //r=sqrt((x^2)+(y^2))
    float radius=length(toCenter)*2.0;

    color=hsv2rgb(vec3((angle/TWO_PI)+(u_time/5.),radius,1.0));
    gl_FragColor=vec4(vec3(color.r,color.g,color.b),1.0);
}